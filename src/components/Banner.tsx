// src/components/Banner.tsx
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
    // ++ راه حل اینجاست ++
    // قبل از هر کاری، بررسی می‌کنیم که آرایه وجود دارد و خالی نیست
    if (netflixOriginals && netflixOriginals.length > 0) {
      setMovie(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      );
    }
  }, [netflixOriginals]); // وابستگی به netflixOriginals درست است

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  // نمایش حالت لودینگ تا زمانی که فیلم انتخاب نشده
  if (!movie) {
    return (
      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen bg-black/50" />
        <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl text-white pl-4 lg:pl-16">
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
          priority // لود شدن این عکس در اولویت قرار می‌گیرد
        />
        <div className="absolute w-full h-32 bg-gradient-to-t from-[#010511] to-transparent bottom-0 z-20" />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie.title || movie.name || movie.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
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
