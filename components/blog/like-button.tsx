"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleLike } from "@/app/actions";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
    postId: string;
    likeCount: number;
    hasLiked: boolean;
    isLoggedIn: boolean;
}

export default function LikeButton({ postId, likeCount, hasLiked, isLoggedIn }: LikeButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLike = () => {
        if (!isLoggedIn) {
            alert("로그인이 필요한 기능입니다.");
            router.push("/auth?mode=login");
            return;
        }

        startTransition(async () => {
            const result = await toggleLike(postId);
            if (result.error) {
                alert(result.error);
            }
        });
    };

    return (
        <button
            onClick={handleLike}
            disabled={isPending}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${hasLiked
                    ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
                    : "bg-gray-800/50 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-600"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <Heart className={`w-5 h-5 transition-transform duration-300 ${hasLiked ? "fill-current scale-110" : "group-hover:scale-110"}`} />
            <span className="font-medium text-sm">{likeCount}</span>
        </button>
    );
}
