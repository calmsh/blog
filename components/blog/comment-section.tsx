"use client";

import { useTransition, useState } from "react";
import { addComment, deleteComment } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Trash2, MessageSquare, Loader2 } from "lucide-react";

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
}

interface CommentSectionProps {
    postId: string;
    comments: Comment[];
    currentUserId: string | null;
}

export default function CommentSection({ postId, comments, currentUserId }: CommentSectionProps) {
    const [content, setContent] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUserId) {
            alert("로그인이 필요한 기능입니다.");
            router.push("/auth?mode=login");
            return;
        }

        if (!content.trim()) return;

        startTransition(async () => {
            const result = await addComment(postId, content);
            if (result.error) {
                alert(result.error);
            } else {
                setContent("");
            }
        });
    };

    const handleDelete = (commentId: string) => {
        if (!confirm("댓글을 삭제하시겠습니까?")) return;

        startTransition(async () => {
            const result = await deleteComment(commentId, postId);
            if (result.error) {
                alert(result.error);
            }
        });
    };

    const generateUserName = (userId: string) => {
        const num = userId.replace(/[^0-9]/g, '').slice(0, 4);
        return num.length > 0 ? `익명사용자_${num}` : "익명사용자";
    };

    return (
        <div className="mt-16 border-t border-gray-800 pt-10">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                댓글 <span className="text-gray-500 text-lg font-medium">{comments.length}</span>
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-10 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={currentUserId ? "추가하고 싶은 내용이나 의견을 남겨주세요." : "로그인 후 댓글을 남길 수 있습니다."}
                    disabled={!currentUserId || isPending}
                    className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none min-h-[100px] mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                    <div className="text-sm text-gray-500">
                        {currentUserId ? "건전하고 따뜻한 댓글 문화를 만들어가요! ✨" : "댓글을 작성하려면 먼저 로그인하세요."}
                    </div>
                    <button
                        type="submit"
                        disabled={!currentUserId || !content.trim() || isPending}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />등록 중...</>
                        ) : "댓글 등록"}
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <div className="text-center py-10 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                        <p className="text-gray-500">아직 작성된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-900/50 rounded-xl p-5 border border-gray-800/80 group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-300 text-sm">
                                            {generateUserName(comment.user_id)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                {currentUserId === comment.user_id && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        disabled={isPending}
                                        className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 disabled:opacity-50"
                                        title="댓글 삭제"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed pl-11">
                                {comment.content}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
