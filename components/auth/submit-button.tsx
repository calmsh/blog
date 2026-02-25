"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
    pendingText: string;
    defaultText: string;
}

export default function SubmitButton({ pendingText, defaultText }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {pendingText}
                </>
            ) : (
                defaultText
            )}
        </button>
    );
}
