// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import ReactPlayer from "react-player";
// import Header from "@/components/Header";
// import MovieModal from "@/components/MovieModal";
// import { MediaDetails } from "@/types";
// import {
//   StarIcon,
//   PlusIcon,
//   HandThumbUpIcon,
//   CheckIcon,
// } from "@heroicons/react/24/solid";
// import Thumbnail from "@/components/Thumbnail";
// import Link from "next/link";

// interface Props {
//   params: {
//     id: string;
//   };
// }

// function MovieDetailsPage({ params }: Props) {
//   const { id } = params;

//   const [media, setMedia] = useState<MediaDetails | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [trailer, setTrailer] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchDetails() {
//       const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos,credits,reviews,similar`;
//       const res = await fetch(url);
//       const data: MediaDetails = await res.json();

//       setMedia(data);
//       const trailerKey =
//         data.videos?.results.find((v) => v.type === "Trailer")?.key ||
//         data.videos?.results[0]?.key;
//       setTrailer(trailerKey || null);
//     }

//     fetchDetails();
//   }, [id]);

//   const handleAddToFavorites = () => {
//     setIsFavorite(!isFavorite);
//     console.log(`Toggled favorite status for: ${media?.title}`);
//     // در اینجا منطق ارسال به پایگاه داده قرار می‌گیرد
//   };

//   if (!media) {
//     return (
//       <div className="min-h-screen bg-[#141414]">
//         <Header />
//         <main className="flex h-screen items-center justify-center">
//           <p className="text-white">Loading...</p>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#141414]">
//       <Header />
//       <main className="pb-12">
//         <div className="container-fliud mx-auto px-4 pt-24 lg:px-8">
//           <nav className="text-sm border p-3 text-gray-400">
//             <Link href="/" className="hover:text-white">
//               Home
//             </Link>
//             {" > "}
//             <Link href="/search?type=movie" className="hover:text-white">
//               Movies
//             </Link>
//             <span className="text-white">
//               {" > "} {media.title || media.name}
//             </span>
//           </nav>
//         </div>

//         {/* ۱. پوستر / پلیر شرطی */}
//         <div className="relative mt-4 h-[56.25vw] max-h-[80vh] w-full bg-black">
//           {isPlaying && trailer ? (
//             <ReactPlayer
//               src={`https://www.youtube.com/watch?v=${trailer}`}
//               width="100%"
//               height="100%"
//               playing
//               controls
//               style={{ position: "absolute", top: 0, left: 0 }}
//             />
//           ) : (
//             <div className="relative h-full w-full">
//               <Image
//                 src={`https://image.tmdb.org/t/p/original/${
//                   media.backdrop_path || media.poster_path
//                 }`}
//                 fill
//                 style={{ objectFit: "cover" }}
//                 priority
//                 alt={media.title || media.name || "Movie Poster"}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
//             </div>
//           )}
//         </div>

//         <div className="container mx-auto px-4 py-8 lg:px-8">
//           <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
//             <div className="lg:col-span-2">
//               <div className="flex flex-col gap-y-4">
//                 <div className="flex items-center space-x-4">
//                   <h1 className="text-3xl font-bold text-white md:text-4xl">
//                     {media.title || media.name}
//                   </h1>
//                   <p className="font-semibold text-green-400">
//                     {media.vote_average.toFixed(1) * 10}% Match
//                   </p>
//                   <p className="text-gray-400">
//                     {media.release_date?.split("-")[0] ||
//                       media.first_air_date?.split("-")[0]}
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => setIsPlaying(true)}
//                     className="flex items-center gap-x-2 rounded bg-white px-6 py-2 text-lg font-bold text-black transition hover:bg-gray-200"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="h-7 w-7"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     Play Trailer
//                   </button>

//                   {/* ۲. دکمه علاقه‌مندی‌ها با منطق جدید */}
//                   <button
//                     onClick={handleAddToFavorites}
//                     className="modalButton"
//                   >
//                     {isFavorite ? (
//                       <CheckIcon className="h-7 w-7 text-green-400" />
//                     ) : (
//                       <PlusIcon className="h-7 w-7 text-white" />
//                     )}
//                   </button>
//                   <button className="modalButton">
//                     <HandThumbUpIcon className="h-7 w-7 text-white" />
//                   </button>
//                 </div>
//               </div>

//               <p className="mt-6 text-base text-gray-300">{media.overview}</p>

//               <div className="mt-10">
//                 <h2 className="text-2xl font-semibold text-white">
//                   More Like This
//                 </h2>
//                 {/* ۳. چیدمان اصلاح‌شده و ریسپانسیو */}
//                 <div className="mt-4 grid grid-cols-1 space-x-2 sm:gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
//                   {media.similar.results.slice(0, 8).map((movie) => (
//                     <Thumbnail key={movie.id} movie={movie} />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <span className="text-gray-500">Cast: </span>
//                 <span className="text-white">
//                   {media.credits.cast
//                     .slice(0, 4)
//                     .map((c) => c.name)
//                     .join(", ")}
//                   ...
//                 </span>
//               </div>
//               <div>
//                 <span className="text-gray-500">Genres: </span>
//                 <span className="text-white">
//                   {media.genres.map((g) => g.name).join(", ")}
//                 </span>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-semibold text-white">
//                   User Reviews
//                 </h3>
//                 {media.reviews.results.length > 0 ? (
//                   <div className="mt-4 max-h-80 space-y-4 overflow-y-auto pr-2 [scrollbar-width:thin]">
//                     {media.reviews.results.slice(0, 5).map((review) => (
//                       <div
//                         key={review.id}
//                         className="rounded-lg bg-[#1f1f1f] p-4"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <p className="font-semibold text-white">
//                             {review.author}
//                           </p>
//                           {review.author_details.rating && (
//                             <div className="flex items-center">
//                               <StarIcon className="h-4 w-4 text-yellow-400" />
//                               <span className="ml-1 text-sm text-gray-300">
//                                 {review.author_details.rating} / 10
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <p className="mt-2 text-sm text-gray-400 line-clamp-3">
//                           {review.content}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="mt-4 text-gray-500">No reviews yet.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <MovieModal />
//     </div>
//   );
// }

// export default MovieDetailsPage;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import Header from "@/components/Header";
import MovieModal from "@/components/MovieModal";
import { MediaDetails } from "@/types";
import {
  StarIcon,
  PlusIcon,
  HandThumbUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import Thumbnail from "@/components/Thumbnail";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

function MovieDetailsPage({ params }: Props) {
  const { id } = params;

  const [media, setMedia] = useState<MediaDetails | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [trailer, setTrailer] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos,credits,reviews,similar`;
      const res = await fetch(url);
      const data: MediaDetails = await res.json();

      setMedia(data);
      const trailerKey =
        data.videos?.results.find((v) => v.type === "Trailer")?.key ||
        data.videos?.results[0]?.key;
      setTrailer(trailerKey || null);
    }

    fetchDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    console.log(`Toggled favorite status for: ${media?.title}`);
  };

  if (!media) {
    return (
      <div className="min-h-screen bg-[#141414]">
        <Header />
        <main className="flex h-screen items-center justify-center">
          <p className="text-white">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Header />
      <main className="pb-12">
        <div className="container mx-auto px-4 pt-24 lg:px-8">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {" > "}
            <Link href="/search?type=movie" className="hover:text-white">
              Movies
            </Link>
            <span className="text-white">
              {" > "} {media.title || media.name}
            </span>
          </nav>
        </div>

        <div className="relative mt-4 h-[56.25vw] max-h-[80vh] w-full bg-black">
          {isPlaying && trailer ? (
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              playing
              controls
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          ) : (
            <div className="relative h-full w-full">
              <Image
                src={`https://image.tmdb.org/t/p/original/${
                  media.backdrop_path || media.poster_path
                }`}
                fill
                style={{ objectFit: "cover" }}
                priority
                alt={media.title || media.name || "Movie Poster"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold text-white md:text-4xl">
                    {media.title || media.name}
                  </h1>
                  {/* ++ راه حل اینجاست: اول ضرب و بعد گرد کردن ++ */}
                  <p className="font-semibold text-green-400">
                    {Math.round(media.vote_average * 10)}% Match
                  </p>
                  <p className="text-gray-400">
                    {media.release_date?.split("-")[0] ||
                      media.first_air_date?.split("-")[0]}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="flex items-center gap-x-2 rounded bg-white px-6 py-2 text-lg font-bold text-black transition hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-7 w-7"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Play Trailer
                  </button>
                  <button
                    onClick={handleAddToFavorites}
                    className="modalButton"
                  >
                    {isFavorite ? (
                      <CheckIcon className="h-7 w-7 text-green-400" />
                    ) : (
                      <PlusIcon className="h-7 w-7" />
                    )}
                  </button>
                  <button className="modalButton">
                    <HandThumbUpIcon className="h-7 w-7" />
                  </button>
                </div>
              </div>

              <p className="mt-6 text-base text-gray-300">{media.overview}</p>

              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-white">
                  More Like This
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {media.similar.results.slice(0, 8).map((movie) => (
                    <Thumbnail key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-gray-500">Cast: </span>
                <span className="text-white">
                  {media.credits.cast
                    .slice(0, 4)
                    .map((c) => c.name)
                    .join(", ")}
                  ...
                </span>
              </div>
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-white">
                  {media.genres.map((g) => g.name).join(", ")}
                </span>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white">
                  User Reviews
                </h3>
                {media.reviews.results.length > 0 ? (
                  <div className="mt-4 max-h-80 space-y-4 overflow-y-auto pr-2 [scrollbar-width:thin]">
                    {media.reviews.results.slice(0, 5).map((review) => (
                      <div
                        key={review.id}
                        className="rounded-lg bg-[#1f1f1f] p-4"
                      >
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-white">
                            {review.author}
                          </p>
                          {review.author_details.rating && (
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <span className="ml-1 text-sm text-gray-300">
                                {review.author_details.rating} / 10
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                          {review.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <MovieModal />
    </div>
  );
}

export default MovieDetailsPage;
