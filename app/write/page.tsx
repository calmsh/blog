'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { createPost } from '@/app/actions';
import {
    ArrowLeft,
    Send,
    Bold,
    Italic,
    Heading1,
    Link as LinkIcon,
    Quote,
    Code,
    Image as ImageIcon,
    Eye,
    EyeOff,
    Loader2,
    Bell
} from 'lucide-react';

export default function WritePage() {
    const router = useRouter();

    // State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    // Toolbar handlers
    const insertText = (before: string, after: string = '') => {
        const textarea = document.getElementById('editor-textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
        setContent(newText);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setIsPublishing(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);

            const result = await createPost(formData);

            if (result?.error) {
                if (result.error === '로그인이 필요합니다.') {
                    alert('로그인이 필요합니다.');
                    router.push('/auth');
                } else {
                    throw new Error(result.error);
                }
            } else {
                alert('성공적으로 발행되었습니다!');
                router.push('/');
            }
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('발행 중 오류가 발생했습니다.');
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-300 flex flex-col">
            {/* Header */}
            <header className="border-b border-gray-800 bg-[#0B1120]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 max-w-[1200px] h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Saved to drafts</span>
                        <button className="px-4 py-2 rounded-lg bg-[#1E293B] text-sm font-medium text-gray-300 hover:text-white hover:bg-[#2D3B4F] transition-colors">
                            Save Draft
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPublishing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                </>
                            ) : (
                                <>
                                    Publish
                                    <Send className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </button>
                        <div className="w-px h-6 bg-gray-800 mx-2" />
                        <button className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                            <Bell className="w-4 h-4" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5E1C8] to-[#EEDDB8] ring-1 ring-gray-700 flex items-center justify-center overflow-hidden">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-600/50 mt-2" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" />
                                <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 pt-12 pb-8 max-w-[1200px] flex flex-col">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full bg-transparent text-5xl font-bold text-white placeholder-gray-600 border-none outline-none mb-6"
                />

                {/* Toolbar */}
                <div className="flex items-center gap-4 py-4 mb-4">
                    <div className="flex items-center gap-4">
                        <ToolbarTextButton onClick={() => insertText('**', '**')} label="B" title="Bold" />
                        <ToolbarTextButton onClick={() => insertText('*', '*')} label={<span className="italic font-serif">I</span>} title="Italic" />
                        <ToolbarTextButton onClick={() => insertText('### ')} label="T" title="Heading" />
                    </div>

                    <div className="w-px h-5 bg-gray-800" />

                    <div className="flex items-center gap-4">
                        <ToolbarIconButton onClick={() => insertText('`', '`')} icon={<Code className="w-4 h-4" />} title="Code" />
                        <ToolbarTextButton onClick={() => insertText('> ')} label='""' title="Quote" className="font-serif font-black" />
                        <ToolbarIconButton onClick={() => insertText('[', '](url)')} icon={<LinkIcon className="w-4 h-4" />} title="Link" />
                        <ToolbarIconButton onClick={() => insertText('![alt](', ')')} icon={<ImageIcon className="w-4 h-4" />} title="Image" />
                    </div>

                    <div className="w-px h-5 bg-gray-800" />

                    <div className="flex items-center">
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className={`p-1.5 rounded-full hover:bg-[#1E293B] transition-colors ${isPreview ? 'text-blue-400 bg-[#1E293B]' : 'text-gray-400'}`}
                            title={isPreview ? "Edit Mode" : "Preview"}
                        >
                            {isPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Editor Container */}
                <div className="flex-grow flex flex-col border border-gray-800 rounded-lg overflow-hidden bg-[#0A0F1A]">
                    {/* Editor / Preview Area */}
                    <div className="flex-grow relative min-h-[600px]">
                        {isPreview ? (
                            <div className="absolute inset-0 p-8 overflow-y-auto prose prose-invert prose-pre:bg-[#1E293B] prose-a:text-blue-400 max-w-none">
                                <ReactMarkdown>{content || '*No content to preview*'}</ReactMarkdown>
                            </div>
                        ) : (
                            <textarea
                                id="editor-textarea"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Start writing..."
                                className="absolute inset-0 w-full h-full bg-transparent p-8 text-gray-300 resize-none outline-none font-mono text-[15px] leading-relaxed placeholder-gray-600 focus:ring-0"
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function ToolbarTextButton({ onClick, label, title, className = "" }: { onClick: () => void; label: React.ReactNode; title: string; className?: string }) {
    return (
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={`text-[15px] font-bold text-gray-400 hover:text-white transition-colors flex items-center justify-center ${className}`}
            title={title}
        >
            {label}
        </button>
    );
}

function ToolbarIconButton({ onClick, icon, title }: { onClick: () => void; icon: React.ReactNode; title: string }) {
    return (
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className="text-gray-400 hover:text-white transition-colors flex items-center justify-center"
            title={title}
        >
            {icon}
        </button>
    );
}
