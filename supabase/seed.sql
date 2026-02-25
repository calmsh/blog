-- Seed Categories
INSERT INTO public.categories (id, name) VALUES
('b1928374-e5f6-4a5b-9c8d-7e6f5a4b3c2d', '개발'),
('c2837465-f6a7-5b6c-0d9e-8f7a6b5c4d3e', '라이프스타일'),
('d3948576-a7b8-6c7d-1e0f-9a8b7c6d5e4f', '기술'),
('e4059687-b8c9-7d8e-2f1a-0b9c8d7e6f5a', '디자인')
ON CONFLICT (name) DO NOTHING;

-- Seed Posts
INSERT INTO public.posts (title, content, category_id, image_url) VALUES
(
    'Next.js 14 서버 액션 완벽 가이드', 
    '서버 액션(Server Actions)은 Next.js 14에서 안정화된 기능으로, 클라이언트에서 서버의 함수를 직접 호출할 수 있게 해줍니다. 이 글에서는 폼 제출, 데이터 뮤테이션, 그리고 에러 처리까지 서버 액션의 모든 것을 알아봅니다. 기존 API 라우트를 대체하는 방법과 보안적인 측면에서의 장단점도 함께 분석합니다.', 
    'b1928374-e5f6-4a5b-9c8d-7e6f5a4b3c2d', 
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
),
(
    '모던 웹을 위한 타이포그래피 원칙', 
    '웹 디자인에서 타이포그래피는 단순한 글꼴 선택을 넘어선 전체적인 사용자 경험의 핵심입니다. 가독성을 높이는 줄 간격 설정, 적절한 폰트 스케일링, 그리고 다크 모드에서의 대비 조절 방법 등을 실무적인 관점에서 다룹니다.', 
    'e4059687-b8c9-7d8e-2f1a-0b9c8d7e6f5a', 
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
),
(
    '생산성을 높이는 터미널 세팅', 
    '개발자에게 터미널은 두 번째 집과 같습니다. Zsh, Oh My Zsh, 그리고 생산성을 극대화해주는 다양한 플러그인들을 소개합니다. 특히 fzf와 ripgrep을 활용한 파일 검색, 명령어 히스토리 관리 등 실제 개발 환경에서 바로 적용할 수 있는 팁들을 공유합니다.', 
    'c2837465-f6a7-5b6c-0d9e-8f7a6b5c4d3e', 
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'
),
(
    '알고리즘 문제 풀이 - 동적 계획법 (DP)', 
    '동적 계획법은 많은 개발자들이 코딩 테스트에서 가장 어려워하는 주제 중 하나입니다. 메모이제이션(Memoization)과 타뷸레이션(Tabulation)의 차이점, 그리고 복잡한 문제를 작은 하위 문제로 나누는 사고의 흐름을 실제 예제와 함께 자세히 설명합니다.', 
    'b1928374-e5f6-4a5b-9c8d-7e6f5a4b3c2d', 
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800'
),
(
    'React Server Components의 이해', 
    '리액트 서버 컴포넌트(RSC)는 프론트엔드 생태계에 큰 변화를 가져왔습니다. 서버 컴포넌트와 클라이언트 컴포넌트의 차이점, 스트리밍(Streaming)의 작동 원리, 그리고 Next.js 앱 라우터에서 이를 어떻게 효과적으로 혼합해서 사용할 수 있는지 심층적으로 분석합니다.', 
    'd3948576-a7b8-6c7d-1e0f-9a8b7c6d5e4f', 
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
),
(
    '스타트업에서 개발 문화 만들기', 
    '좋은 개발 문화는 우수한 인재를 유치하고 유지하는 가장 강력한 무기입니다. 원활한 코드 리뷰 프로세스 구축, 문서화의 중요성, 그리고 자율적이고 수평적인 커뮤니케이션 환경을 조성하기 위해 시도했던 여러 가지 경험과 교훈들을 나눕니다.', 
    'c2837465-f6a7-5b6c-0d9e-8f7a6b5c4d3e', 
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
),
(
    '초보자를 위한 타입스크립트 제네릭', 
    '타입스크립트를 배우면서 가장 먼저 마주치는 난관이 바로 제네릭(Generics)입니다. 제네릭이 왜 필요한지, 다양한 제약 조건(Constraints)을 설정하는 방법, 그리고 유틸리티 타입 구현 등을 통해 제네릭의 마법을 이해해 봅니다.', 
    'b1928374-e5f6-4a5b-9c8d-7e6f5a4b3c2d', 
    'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800'
);
