import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { createClient } from '@/utils/supabase/server';

const POSTS_PER_PAGE = 6;

// Define params for server component
interface SearchParams {
  category?: string;
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category || null;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const supabase = await createClient();

  // 1. Fetch Categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  const categories = categoriesData || [];

  // 2. Fetch Posts
  let query = supabase
    .from('posts')
    .select(`
            id,
            title,
            content,
            image_url,
            created_at,
            category:categories(name)
        `)
    .order('created_at', { ascending: false });

  if (selectedCategory) {
    query = query.eq('category_id', selectedCategory);
  }

  const { data: rawPosts, error: postError } = await query;
  const allPosts = rawPosts?.map((post: any) => ({
    ...post,
    category: Array.isArray(post.category) ? post.category[0] : post.category,
  })) || [];

  // 3. Pagination Logic
  const calculatedTotalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const totalPages = calculatedTotalPages;
  const safePage = Math.min(currentPage, calculatedTotalPages);
  const paginatedPosts = allPosts.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  const paginationSearchParams: Record<string, string> = {};
  if (selectedCategory) paginationSearchParams.category = selectedCategory;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white flex gap-4 items-center sm:text-5xl mb-4">
            최신 글
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-400 leading-relaxed">
            소프트웨어 개발에 대한 생각, 튜토리얼, 심층 분석. 모던 웹 기술, 시스템 프로그래밍, 클린 코드에 집중합니다.
          </p>
        </div>

        <CategoryFilter categories={categories} />

        {paginatedPosts.length > 0 ? (
          <>
            <PostList posts={paginatedPosts} />
            <Pagination currentPage={safePage} totalPages={totalPages} searchParams={paginationSearchParams} />
          </>
        ) : (
          <div className="text-center py-20 text-gray-500 min-h-[400px] flex items-center justify-center">
            <p className="text-lg">등록된 게시글이 없습니다.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
