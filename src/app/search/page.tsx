import Header from "@/components/Header";
import Thumbnail from "@/components/Thumbnail";
import { Movie } from "@/types";
import MovieModal from "@/components/MovieModal";
import SearchForm from "@/components/searchForm";
import Pagination from "@/components/Pagination";

interface SearchPageProps {
  searchParams: {
    q?: string;
    type?: string;
    genre?: string;
    year?: string;
    page?: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const q = searchParams.q;
  const type = searchParams.type || "movie";
  const genre = searchParams.genre;
  const year = searchParams.year;
  const page = searchParams.page || "1";

  let apiUrl = "";
  if (q) {
    // اگر کاربر متنی را جستجو کرده بود، از API جستجو استفاده می‌کنیم
    apiUrl = `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${q}&language=en-US&page=${page}`;
  } else {
    // در غیر این صورت، از API کشف (فیلتر پیشرفته) استفاده می‌کنیم
    apiUrl = `https://api.themoviedb.org/3/discover/${type}?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=en-US&with_genres=${genre || ""}&primary_release_year=${
      year || ""
    }&sort_by=popularity.desc&page=${page}`;
  }

  const res = await fetch(apiUrl);
  const data = await res.json();

  const results: Movie[] = data.results || [];
  const totalPages: number =
    data.total_pages > 500 ? 500 : data.total_pages || 1;
  const currentPage: number = data.page || 1;

  return (
    <div className="min-h-screen bg-[#141414]">
      <Header />
      <main className="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Search & Discover
        </h1>
        <p className="mb-8 text-gray-400">
          Refine your search using the form below or browse the results.
        </p>

        {/* فرم جستجو که مقادیر اولیه را از URL می‌گیرد */}
        <SearchForm
          initialQuery={q}
          initialType={type}
          initialGenre={genre}
          initialYear={year}
        />

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-300">
            {q ? `Showing results for "${q}"` : "Discover Results"}
          </h2>

          {results && results.length > 0 ? (
            <>
              <div className="mt-6 flex flex-wrap items-center justify-around space-x-2 space-y-4">
                {results.map((movie) => (
                  <Thumbnail key={movie.id} movie={movie} />
                ))}
              </div>
              {/* کامپوننت صفحه‌بندی */}
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-400">
                No results found for your query.
              </p>
              <p className="text-sm text-gray-500">
                Try adjusting your search filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <MovieModal />
    </div>
  );
}

export default SearchPage;
