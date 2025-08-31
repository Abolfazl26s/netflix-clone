import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Row from "@/components/Row";
import requests from "@/utils/requests";
import { authOptions } from "./api/auth/[...nextauth]/route";
import MovieModal from "@/components/MovieModal";
import BannerSkeleton from "@/components/BannerSkeleton";
import RowSkeleton from "@/components/RowSkeleton";

// تابع کمکی برای دریافت داده با مدیریت خطا
async function getData(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // کش کردن داده برای ۱ ساعت
    if (!res.ok) {
      console.error(`API call failed for ${url}: ${res.statusText}`);
      return { results: [] };
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { results: [] };
  }
}

// کامپوننت غیرهمزمان برای محتوای بنر
// این کامپوننت به صورت مستقل داده‌های خود را دریافت می‌کند
async function BannerContent() {
  const trendingNow = await getData(requests.fetchTrending);
  return <Banner bannerContent={trendingNow.results} />;
}

// کامپوننت غیرهمزمان برای ردیف‌های فیلم
// این کامپوننت هم به صورت مستقل داده‌های خود را دریافت می‌کند
async function RowsContent() {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    getData(requests.fetchNetflixOriginals),
    getData(requests.fetchTrending),
    getData(requests.fetchTopRated),
    getData(requests.fetchActionMovies),
    getData(requests.fetchComedyMovies),
    getData(requests.fetchHorrorMovies),
    getData(requests.fetchRomanceMovies),
    getData(requests.fetchDocumentaries),
  ]);

  return (
    <section className="md:space-y-24">
      <Row title="Trending Now" movies={trendingNow.results} />
      <Row title="Top Rated" movies={topRated.results} />
      <Row title="Netflix Originals" movies={netflixOriginals.results} />
      <Row title="Action Thrillers" movies={actionMovies.results} />
      <Row title="Comedies" movies={comedyMovies.results} />
      <Row title="Scary Movies" movies={horrorMovies.results} />
      <Row title="Romance Movies" movies={romanceMovies.results} />
      <Row title="Documentaries" movies={documentaries.results} />
    </section>
  );
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[100%]">
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Suspense برای بنر: تا زمانی که داده‌های بنر آماده نشده، اسکلت آن را نمایش می‌دهد */}
        <Suspense fallback={<BannerSkeleton />}>
          <BannerContent />
        </Suspense>

        {/* Suspense برای ردیف‌ها: تا زمانی که داده‌های ردیف‌ها آماده نشده، چند اسکلت ردیف نمایش می‌دهد */}
        <Suspense
          fallback={
            <>
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </>
          }
        >
          <RowsContent />
        </Suspense>

        <MovieModal />
      </main>
    </div>
  );
}
