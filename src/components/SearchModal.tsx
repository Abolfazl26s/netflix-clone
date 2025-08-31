"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useSearchModal from "@/store/searchStore";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Genre } from "@/types";

function SearchModal() {
  const { isOpen, closeSearch } = useSearchModal();
  const router = useRouter();

  // State برای فیلدهای فرم
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  // State برای لیست ژانرها
  const [genres, setGenres] = useState<Genre[]>([]);

  // Fetch کردن لیست ژانرها وقتی مودال باز می‌شود
  useEffect(() => {
    if (!isOpen) return;

    async function fetchGenres() {
      const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
      const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;

      const [movieRes, tvRes] = await Promise.all([
        fetch(movieGenresUrl),
        fetch(tvGenresUrl),
      ]);
      const [movieData, tvData] = await Promise.all([
        movieRes.json(),
        tvRes.json(),
      ]);

      // ادغام ژانرها و حذف موارد تکراری
      const allGenres = [...movieData.genres, ...tvData.genres];
      const uniqueGenres = Array.from(
        new Map(allGenres.map((item) => [item.id, item])).values()
      );
      setGenres(uniqueGenres);
    }

    fetchGenres();
  }, [isOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query && !genre && !year) return; // حداقل یک فیلد باید پر باشد

    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (type) params.append("type", type);
    if (genre) params.append("genre", genre);
    if (year) params.append("year", year);

    router.push(`/search?${params.toString()}`);
    closeSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-2xl rounded-lg bg-[#141414] p-8 shadow-2xl">
        <button
          onClick={closeSearch}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="mb-6 text-2xl font-bold text-white">Advanced Search</h2>

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {/* Search Query */}
          <div className="sm:col-span-2">
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white focus:border-red-500 focus:ring-red-500"
              placeholder="e.g., The Matrix"
            />
          </div>

          {/* Type (Movie/TV) */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white focus:border-red-500 focus:ring-red-500"
            >
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>
          </div>

          {/* Genre */}
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-300"
            >
              Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white focus:border-red-500 focus:ring-red-500"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="sm:col-span-2">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-300"
            >
              Year of Release
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white focus:border-red-500 focus:ring-red-500"
              placeholder="e.g., 1999"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md bg-red-600 p-3 text-lg font-bold text-white transition hover:bg-red-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchModal;
