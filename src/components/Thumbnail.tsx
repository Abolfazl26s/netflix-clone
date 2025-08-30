"use client";

// ++ ۱. useState را از react وارد کنید ++
import { useState } from "react";
import { Movie } from "@/types";
import Image from "next/image";
import useMovieModal from "@/store/modalStore";
import { StarIcon } from "@heroicons/react/24/solid";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const { openModal } = useMovieModal();
  // ++ ۲. یک state برای کنترل وضعیت هاور هر تامنیل تعریف کنید ++
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => openModal(movie)}
      // ++ ۳. توابع جاوااسکریپت را برای مدیریت ورود و خروج موس اضافه کنید ++
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // کلاس 'group' دیگر نیازی نیست و حذف شده است
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        fill
        className="rounded-sm object-cover md:rounded"
        alt={movie.title || movie.name}
      />

      {/* ++ ۴. نمایش overlay را به متغیر 'isHovered' وابسته کنید ++ */}
      <div
        className={`absolute inset-0 flex flex-col justify-end rounded-sm bg-black/10 p-2.5 transition-opacity duration-300 md:rounded ${
          isHovered ? "bg-black/40 opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />

        <div className="relative z-10">
          <h3 className="truncate text-base font-bold text-white">
            {movie.title || movie.name}
          </h3>
          <div className="mt-1 flex items-center space-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <p className="text-sm font-semibold text-white">
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;
