import Banner from "@/components/Banner";
import requests from "@/utils/requests";
import { Movie } from "@/types";

async function getData(url: string): Promise<{ results: Movie[] }> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [] };
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { results: [] };
  }
}

// این یک کامپوننت سرور است (چون 'use client' ندارد)
export default async function BannerContent() {
  const trendingNow = await getData(requests.fetchTrending);
  return <Banner bannerContent={trendingNow.results} />;
}
