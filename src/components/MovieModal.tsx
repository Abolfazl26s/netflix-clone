"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  XMarkIcon,
  PlayIcon,
  PlusIcon,
  HandThumbUpIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import useMovieModal from "@/store/modalStore";
import { Genre, Movie } from "@/types";
import Link from "next/link";

// ++ ۱. یک نوع مشخص برای ویدیوها تعریف می‌کنیم ++
interface Video {
  type: "Trailer" | "Teaser" | "Clip" | "Featurette" | "Behind the Scenes";
  key: string;
}

function MovieModal() {
  const { movie, isOpen, closeModal } = useMovieModal();
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        // ++ ۲. به جای 'any' از نوع 'Video' که تعریف کردیم استفاده می‌کنیم ++
        const index = data.videos.results.findIndex(
          (element: Video) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
    setIsFavorite(false);
  }, [movie]);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    console.log(`Toggled favorite status for: ${movie?.title}`);
  };

  if (!isOpen) return null;

  return (
    // ... بقیه کد JSX بدون تغییر باقی می‌ماند ...
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 transition-all duration-300"
      onClick={closeModal}
    >
      <div
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg bg-[#141414] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="modalButton text-white absolute right-4 top-4 !z-40 h-9 w-9 border-none bg-black/50 hover:bg-black/75"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          {trailer ? (
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
          ) : (
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black">
              <p className="text-white">No trailer available</p>
            </div>
          )}
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-6 py-2 text-lg font-bold text-black transition hover:bg-gray-200">
                <PlayIcon className="h-7 w-7 text-black" />
                Play
              </button>
              <button onClick={handleAddToFavorites} className="modalButton">
                {isFavorite ? (
                  <CheckIcon className="h-7 w-7 text-green-400" />
                ) : (
                  <PlusIcon className="h-7 w-7 text-white" />
                )}
              </button>
              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7 text-white" />
              </button>
              <Link
                href={`/movie/${movie?.id}`}
                className="modalButton"
                onClick={closeModal}
              >
                <ArrowTopRightOnSquareIcon className="h-7 w-7 text-white" />
              </Link>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4 bg-[#141414] px-10 py-8">
          <h2 className="text-3xl font-bold text-white">
            {movie?.title || movie?.name || movie?.original_name}
          </h2>
          <div className="flex items-center space-x-4 text-base">
            <p className="font-semibold text-green-400">
              {movie!.vote_average.toFixed(1) * 10}% Match
            </p>
            <p className="text-gray-400">
              {movie?.release_date || movie?.first_air_date}
            </p>
            <div className="flex h-5 items-center justify-center rounded border border-gray-400 px-1.5 text-xs text-gray-400">
              HD
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-3">
            <p className="w-full text-base text-white md:col-span-2">
              {movie?.overview}
            </p>
            <div className="flex flex-col space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-white">
                  {genres.map((genre) => genre.name).join(", ")}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Original language: </span>
                <span className="text-white capitalize">
                  {movie?.original_language}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Total votes: </span>
                <span className="text-white">
                  {movie?.vote_count.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
