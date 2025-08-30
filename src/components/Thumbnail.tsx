// // src/components/Thumbnail.tsx
// import { Movie } from "@/types";
// import Image from "next/image";

// interface Props {
//   movie: Movie;
// }

// function Thumbnail({ movie }: Props) {
//   return (
//     <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
//       <Image
//         src={`https://image.tmdb.org/t/p/w500${
//           movie.backdrop_path || movie.poster_path
//         }`}
//         fill
//         className="rounded-sm object-cover md:rounded"
//         alt={movie.title || movie.name}
//       />
//     </div>
//   );
// }

// export default Thumbnail;


"use client"; // این کامپوننت باید کلاینت باشه

import { Movie } from "@/types";
import Image from "next/image";
import useMovieModal from "@/store/modalStore"; // وارد کردن store

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  // گرفتن تابع openModal از store
  const { openModal } = useMovieModal();

  return (
    // با کلیک، مودال باز می‌شه
    <div
      onClick={() => openModal(movie)}
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
    </div>
  );
}

export default Thumbnail;