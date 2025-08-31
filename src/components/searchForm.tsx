"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Genre } from "@/types";

interface SearchFormProps {
  initialQuery?: string;
  initialType?: string;
  initialGenre?: string;
  initialYear?: string;
  initialSortBy?: string;
}

function SearchForm({
  initialQuery = "",
  initialType = "movie",
  initialGenre = "",
  initialYear = "",
  initialSortBy = "popularity.desc",
}: SearchFormProps) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const [genre, setGenre] = useState(initialGenre);
  const [year, setYear] = useState(initialYear);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [errors, setErrors] = useState<{ year?: string; general?: string }>({});

  useEffect(() => {
    async function fetchGenres() {
      const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
      const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(movieGenresUrl),
          fetch(tvGenresUrl),
        ]);
        const [movieData, tvData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ]);
        const allGenres = [...movieData.genres, ...tvData.genres];
        const uniqueGenres = Array.from(
          new Map(allGenres.map((item) => [item.id, item])).values()
        );
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    }
    fetchGenres();
  }, []);

  const validateForm = () => {
    const newErrors: { year?: string; general?: string } = {};
    const currentYear = new Date().getFullYear();

    // اعتبارسنجی سال
    if (year && (parseInt(year) < 1888 || parseInt(year) > currentYear)) {
      newErrors.year = `Please enter a year between 1888 and ${currentYear}.`;
    }

    // اعتبارسنجی برای جلوگیری از جستجوی خالی
    if (!query && !genre && !year) {
      newErrors.general =
        "Please fill at least one of the main fields (Name, Genre, or Year) to search.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true اگر خطایی نباشد
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // ++ قبل از ارسال، فرم را اعتبارسنجی کن ++
    if (!validateForm()) {
      return;
    }

    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (type) params.append("type", type);
    if (genre) params.append("genre", genre);
    if (year) params.append("year", year);
    if (sortBy) params.append("sort_by", sortBy);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mb-10 rounded-lg bg-[#1f1f1f] p-4 shadow-lg md:p-6">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        <div className="lg:col-span-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., The Witcher"
            className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border-gray-600 bg-gray-800 p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded-md border-gray-600 bg-gray-800 p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border-gray-600 bg-gray-800 p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
        >
          <option value="popularity.desc">Popularity</option>
          <option value="release_date.desc">Release Date</option>
          <option value="vote_average.desc">Rating</option>
        </select>

        <div>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className={`w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 ${
              errors.year && "border-red-500 ring-red-500"
            }`}
          />
          {/* ++ نمایش پیام خطا برای سال ++ */}
          {errors.year && (
            <p className="mt-1 text-xs text-red-400">{errors.year}</p>
          )}
        </div>

        {/* ++ نمایش پیام خطای عمومی ++ */}
        {errors.general && (
          <p className="text-center text-sm text-red-400 sm:col-span-2 lg:col-span-6">
            {errors.general}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-red-600 p-3 text-lg font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 sm:col-span-2 lg:col-span-6"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
