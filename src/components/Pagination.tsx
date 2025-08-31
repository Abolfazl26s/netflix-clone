"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.set("page", newPage.toString());
    router.push(`/search?${currentParams.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center space-x-6 text-white">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-x-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span>Previous</span>
      </button>

      <span className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-x-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>Next</span>
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Pagination;
