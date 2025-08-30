// src/app/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Row from "@/components/Row";
import { Movie } from "@/types";
import requests from "@/utils/requests";

export default async function Home() {
  const session = await getServerSession();

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
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals.results} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow.results} />
          <Row title="Top Rated" movies={topRated.results} />
          <Row title="Action Thrillers" movies={actionMovies.results} />
          <Row title="Comedies" movies={comedyMovies.results} />
          <Row title="Scary Movies" movies={horrorMovies.results} />
          <Row title="Romance Movies" movies={romanceMovies.results} />
          <Row title="Documentaries" movies={documentaries.results} />
        </section>
      </main>
    </div>
  );
}
