export const CarDetailsSkeleton = () => {
  return (
    <div className="border p-2 sm:p-3 border-border-gray shadow flex gap-5 items-center text-xs sm:text-md animate-pulse">
      <div className="bg-gray-300 rounded w-24 sm:w-30 h-15 sm:h-20" />

      <div className="flex flex-col gap-2 w-full">
        <div className="bg-gray-300 h-4 sm:h-6 w-1/3 rounded" />

        <div className="bg-gray-300 h-3 w-2/3 rounded" />
        <div className="bg-gray-300 h-3 w-1/2 rounded" />

        <div className="bg-gray-300 h-3 w-1/4 rounded mt-1" />
      </div>
    </div>
  );
};
