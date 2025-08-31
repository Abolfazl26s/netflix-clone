import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Row from "@/components/Row";
import requests from "@/utils/requests";
import { authOptions } from "./api/auth/[...nextauth]/route";
import MovieModal from "@/components/MovieModal";

// تابع کمکی برای دریافت داده با مدیریت خطا
async function getData(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`API call failed for ${url}: ${res.statusText}`);
      return { results: [] }; // در صورت خطا، یک آرایه خالی برگردان
    }
    return res.json();
  } catch (error) {
    console.error(`Network error fetching ${url}:`, error);
    return { results: [] }; // در صورت خطای شبکه، یک آرایه خالی برگردان
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

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
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[100%]">
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner bannerContent={trendingNow.results} />
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

        <MovieModal />
      </main>
    </div>
  );
}
