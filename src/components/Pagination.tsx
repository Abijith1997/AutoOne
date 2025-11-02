import type { Dispatch, SetStateAction } from "react";

export interface PaginationProps {
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  page: number;
}

export const Pagination = ({ setPage, totalPages, page }: PaginationProps) => {
  const goToFirst = () => setPage(1);
  const goToLast = () => setPage(totalPages);
  const goToNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrev = () => setPage((prev) => Math.max(prev - 1, 1));
  return (
    <div className="flex justify-center items-center gap-2 mt-6 w-full">
      <button
        onClick={goToFirst}
        disabled={page === 1}
        className="p-1 border rounded disabled:opacity-50 text-primary hover:scale-103 transition-all duration-150 ease-in-out"
      >
        First
      </button>
      <button
        onClick={goToPrev}
        disabled={page === 1}
        className="p-1 border rounded disabled:opacity-50 text-primary hover:scale-103 transition-all duration-150 ease-in-out"
      >
        Previous
      </button>

      <span className="px-2">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={goToNext}
        disabled={page === totalPages}
        className="p-1 border rounded disabled:opacity-50 text-primary hover:scale-103 transition-all duration-150 ease-in-out"
      >
        Next
      </button>
      <button
        onClick={goToLast}
        disabled={page === totalPages}
        className="p-1 border rounded disabled:opacity-50 text-primary hover:scale-103 transition-all duration-150 ease-in-out"
      >
        Last
      </button>
    </div>
  );
};
