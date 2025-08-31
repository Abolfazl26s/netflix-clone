"use client";

import { Movie } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  bannerContent: Movie[];
}

function Banner({ bannerContent }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (bannerContent && bannerContent.length > 0) {
      setMovie(bannerContent[Math.floor(Math.random() * bannerContent.length)]);
    }
  }, [bannerContent]);

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
        <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-[#010511] to-transparent" />
      </div>

      <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-7xl [text-shadow:2px_2px_4px_rgb(0_0_0_/_45%)]">
        {movie.title || movie.name || movie.original_name}
      </h1>
      <p className="max-w-xs text-sm text-white md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl [text-shadow:2px_2px_4px_rgb(0_0_0_/_45%)] line-clamp-3">
        {movie.overview}
      </p>

      <div className="flex space-x-3">
        <Link href={`/movie/${movie.id}`}>
          <button className="bannerButton bg-white text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-black md:h-7 md:w-7"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
            Play
          </button>
        </Link>

        <Link href={`/movie/${movie.id}`}>
          <button className="bannerButton bg-[gray]/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 md:h-8 md:w-8"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75_0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75_0 11-.671-1.34l.041-.022zM12 9a.75.75_0 100-1.5.75.75_0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;