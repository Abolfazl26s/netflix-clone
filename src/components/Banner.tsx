"use client";

import { Movie } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (netflixOriginals && netflixOriginals.length > 0) {
      setMovie(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      );
    }
  }, [netflixOriginals]);

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  if (!movie) {
    return (
      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen bg-black/50" />
        <h1 className="pl-4 text-2xl font-bold text-white md:text-4xl lg:pl-16 lg:text-7xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
          fill
          style={{ objectFit: "cover" }}
          alt={movie.title || movie.name || "Movie Banner"}
          priority
        />
        {/* ۱. اضافه کردن لایه گرادینت برای ایجاد کنتراست */}
        <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-[#010511] to-transparent" />
      </div>

      {/* ۲. استفاده از متن سفید و سایه متن با روش Arbitrary Properties در v4 */}
      <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-7xl [text-shadow:2px_2px_4px_rgb(0_0_0_/_45%)]">
        {movie.title || movie.name || movie.original_name}
      </h1>
      <p className="max-w-xs text-sm text-white md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl [text-shadow:2px_2px_4px_rgb(0_0_0_/_45%)]">
        {movie.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">▶️ Play</button>
        <button className="bannerButton bg-[gray]/70">ℹ️ More Info</button>
      </div>
    </div>
  );
}

export default Banner;