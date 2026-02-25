import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ShareButton from '@/components/share-button';
import Link from 'next/link';
import LikeButton from '@/components/blog/like-button';
import CommentSection from '@/components/blog/comment-section';

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    const { data: post, error } = await supabase
        .from('posts')
        .select(`
      *,
      category:categories(name),
      comments(*),
      post_likes(id, user_id)
    `)
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    const likeCount = post.post_likes?.length || 0;
    const hasLiked = currentUser ? post.post_likes?.some((like: any) => like.user_id === currentUser.id) : false;
    const comments = post.comments || [];
    comments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    // PostList.tsx와 일관된 작성자 및 소요 시간 목업
    const authors = ['김지훈', '이서연', '박민수', '정하은'];
    const authorIndex = post.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % 4;
    const author = authors[authorIndex];

    const readTime = (post.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % 10) + 3;

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-300 py-12">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {/* 뒤로 가기 버튼 */}
                <div className="mb-8">
                    <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center">
                        ← 메인으로 돌아가기
                    </Link>
                </div>

                {/* 헤더 섹션 */}
                <header className="mb-10 text-center flex flex-col items-center">
                    {post.category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-900/30 border border-blue-500/30 text-blue-400 mb-6">
                            {post.category.name}
                        </span>
                    )}

                    <h1 className="text-4xl md:text-5xl text-white font-extrabold mb-6 leading-tight max-w-3xl">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-8">
                        <span>{new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span>{readTime}분 소요</span>
                    </div>

                    {/* 작성자 및 공유 섹션 */}
                    <div className="flex items-center justify-between w-full max-w-2xl py-6 border-t border-b border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 shadow-lg shadow-blue-500/20"></div>
                            <div className="text-left">
                                <p className="text-base font-medium text-white">{author}</p>
                                <p className="text-sm text-gray-500">Tech Blogger</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <LikeButton
                                postId={post.id}
                                likeCount={likeCount}
                                hasLiked={hasLiked}
                                isLoggedIn={!!currentUser}
                            />
                            <ShareButton />
                        </div>
                    </div>
                </header>

                {/* 썸네일 이미지 */}
                {post.image_url && (
                    <div className="w-full relative aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-gray-800 bg-gray-900 shadow-2xl">
                        <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* 본문 콘텐츠 섹션 */}
                <article className="prose prose-invert prose-lg max-w-none prose-p:leading-loose prose-p:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-blue-400 hover:prose-a:text-blue-300">
                    <div className="text-gray-300 whitespace-pre-wrap font-medium text-lg leading-relaxed tracking-wide">
                        {post.content}
                    </div>
                </article>

                <CommentSection
                    postId={post.id}
                    comments={comments}
                    currentUserId={currentUser?.id || null}
                />
            </main>
        </div>
    );
}
