import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import SubmitButton from "@/components/auth/submit-button";
import { signIn, signUp } from "@/app/actions";

export default async function AuthPage({
    searchParams,
}: {
    searchParams: Promise<{ mode?: string; error?: string; message?: string }>;
}) {
    const params = await searchParams;
    const mode = params.mode || "login";
    const isLogin = mode === "login";
    const error = params.error;
    const message = params.message;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative bg-[var(--background)]">
            <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-[400px] bg-[var(--card-bg)] p-8 rounded-2xl shadow-xl border border-slate-700/50">
                    <div className="mb-8">
                        <Link href="/" className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-6">
                            &larr; 홈으로 돌아가기
                        </Link>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {isLogin ? "환영합니다" : "계정 만들기"}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {isLogin
                                ? "계정에 접속하기 위해 정보를 입력해주세요."
                                : "비밀번호와 이메일을 입력하여 새 계정을 만드세요."}
                        </p>
                    </div>

                    <div className="flex bg-[#0f172a]/50 p-1 rounded-lg mb-8">
                        <Link
                            href="/auth?mode=login"
                            className={`flex-1 py-2 text-center text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-[var(--card-bg)] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            로그인
                        </Link>
                        <Link
                            href="/auth?mode=signup"
                            className={`flex-1 py-2 text-center text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-[var(--card-bg)] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            회원가입
                        </Link>
                    </div>

                    <form action={isLogin ? signIn : signUp} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">이메일 주소</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all border-slate-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-slate-300">비밀번호</label>
                                {isLogin && (
                                    <Link href="#" className="text-xs text-blue-400 hover:text-blue-300">
                                        비밀번호 찾기
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all border-slate-600"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg">
                                {message}
                            </div>
                        )}

                        <div className="pt-2">
                            <SubmitButton
                                pendingText={isLogin ? "로그인 중..." : "회원가입 중..."}
                                defaultText={isLogin ? "로그인" : "회원가입"}
                            />
                        </div>
                    </form>

                    <div className="mt-6 flex items-center justify-center text-xs text-slate-500 px-4 text-center">
                        <span>
                            계속 진행하면 <Link href="#" className="underline hover:text-slate-400">서비스 이용약관</Link> 및 <Link href="#" className="underline hover:text-slate-400">개인정보 처리방침</Link>에 동의하는 것으로 간주됩니다.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
