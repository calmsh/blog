'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        redirect(`/auth?mode=login&error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        redirect(`/auth?mode=signup&error=${encodeURIComponent(error.message)}`);
    }

    if (data?.user && data?.user?.identities && data?.user?.identities.length === 0) {
        redirect(`/auth?mode=signup&error=${encodeURIComponent('이미 존재하는 계정입니다.')}`);
    }

    redirect(`/auth?mode=login&message=${encodeURIComponent('이메일 확인 링크를 확인해 주세요.')}`);
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
}

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    const { error } = await supabase
        .from('posts')
        .insert({
            title,
            content,
            user_id: user.id
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/');
    return { success: true };
}

export async function addComment(postId: string, content: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    const { error } = await supabase
        .from('comments')
        .insert({
            post_id: postId,
            user_id: user.id,
            content
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/blog/${postId}`);
    return { success: true };
}

export async function deleteComment(commentId: string, postId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    const { error } = await supabase
        .from('comments')
        .delete()
        .match({ id: commentId, user_id: user.id });

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/blog/${postId}`);
    return { success: true };
}

export async function toggleLike(postId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    // Check if the user already liked the post
    const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .match({ post_id: postId, user_id: user.id })
        .single();

    if (existingLike) {
        // Unlike
        const { error } = await supabase
            .from('post_likes')
            .delete()
            .match({ id: existingLike.id });

        if (error) return { error: error.message };
    } else {
        // Like
        const { error } = await supabase
            .from('post_likes')
            .insert({ post_id: postId, user_id: user.id });

        if (error) return { error: error.message };
    }

    revalidatePath(`/blog/${postId}`);
    return { success: true };
}
