# Next.js Blog with Supabase

현대적인 웹 기술 스택(Next.js App Router, Tailwind CSS, Supabase)을 활용하여 구축된 풀스택 블로그 플랫폼입니다. 서버 컴포넌트(Server Components)와 서버 액션(Server Actions)을 적극 활용하여 빠르고 안전한 웹 애플리케이션을 구현했습니다.

## 🚀 주요 기능

### 1. 사용자 인증 (Supabase Auth)
- 이메일 및 비밀번호를 통한 회원가입 / 로그인
- 서버 액션을 활용한 안전한 인증 처리
- 세션 기반의 접근 제어 (로그인된 사용자만 글 작성, 댓글, 추천 가능)

### 2. 게시글 관리
- 카테고리별 게시글 분류
- 게시글 작성 기능 (서버 액션 연동)
- 마크다운 스타일의 깔끔하고 가독성 높은 상세 페이지 제공

### 3. 상호작용 (Engagement)
- **추천(좋아요) 기능**: 사용자는 마음에 드는 게시글에 추천을 누를 수 있으며, 클릭 시 실시간(Optimistic UI)으로 반영됩니다.
- **댓글 기능**: 게시글 하단에서 다른 사용자들과 의견을 나눌 수 있습니다. 자신이 작성한 댓글은 바로 삭제할 수 있습니다.

### 4. UI/UX 및 테마
- **Tailwind CSS**를 활용한 세련된 다크 테마(Dark Theme) UI 디자인
- 데스크탑 및 모바일 환경을 모두 지원하는 반응형(Responsive) 레이아웃
- 직관적인 네비게이션과 부드러운 화면 전환 경험 제공

## 🛠 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **언어**: TypeScript
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **아이콘**: [Lucide React](https://lucide.dev/)
- **데이터베이스 & 인증**: [Supabase](https://supabase.com/) (PostgreSQL)

## 📁 프로젝트 구조

```text
├── app/                  # Next.js App Router 기반의 페이지 및 레이아웃
│   ├── auth/             # 로그인 및 회원가입 페이지
│   ├── blog/             # 블로그 게시글 상세 페이지 ([id])
│   ├── write/            # 새 글 작성 페이지
│   ├── actions.ts        # 모든 서버 액션 (로그인, 댓글, 추천 등) 모음
│   └── page.tsx          # 메인 홈 화면 (게시글 리스트)
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── blog/             # 블로그 관련 컴포넌트 (댓글, 추천 버튼 등)
│   ├── auth/             # 인증 관련 컴포넌트 (Submit Button 등)
│   └── ...
├── supabase/             # Supabase 설정 및 마이그레이션 파일
│   └── migrations/       # 데이터베이스 스키마 및 RLS 정책 
├── utils/                # 유틸리티 함수
│   └── supabase/         # Supabase 클라이언트 및 서버 설정
└── public/               # 정적 파일 (이미지, 아이콘 등)
```

## ⚙️ 데이터베이스 스키마 (Supabase)

프로젝트는 다음의 주요 테이블들로 구성되어 있습니다. 각 테이블은 **RLS (Row Level Security)** 가 적용되어 있어 데이터의 안전하게 보호됩니다.

- `users` (Supabase Auth): 사용자 정보
- `categories`: 블로그 카테고리
- `posts`: 블로그 게시글 내용 및 메타데이터
- `comments`: 게시글에 달린 사용자 댓글
- `post_likes`: 사용자의 게시글 추천(좋아요) 내역

## 🚀 로컬 실행 방법

**1. 패키지 설치**
```bash
npm install
```

**2. 환경 변수 설정**
프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래의 Supabase 키를 입력합니다.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**3. 데이터베이스 연동 및 마이그레이션 적용**
```bash
# Supabase CLI를 통해 로컬 마이그레이션을 원격 DB에 푸시합니다.
npx supabase db push
```

## 🚀 배포 (Vercel)
1. **[Vercel](https://vercel.com/)에 GitHub 레포지토리 Import**
2. **Environment Variables**에 `NEXT_PUBLIC_SUPABASE_URL` 및 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 추가
3. **Deploy** 클릭
