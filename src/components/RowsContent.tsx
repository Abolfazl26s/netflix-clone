import Row from "@/components/Row";
import requests from "@/utils/requests";
import { Movie } from "@/types";

async function getData(url: string): Promise<{ results: Movie[] }> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
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

// این یک کامپوننت سرور است
export default async function RowsContent() {
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
