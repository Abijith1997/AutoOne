export const CarSkeleton = () => {
  return (
    <div className="flex flex-col w-full justify-start items-center px-4 md:px-8 animate-pulse">
      <div className="w-full h-[40vh] md:h-[50vh] bg-border-gray rounded mb-4"></div>

      <div className="w-full max-w-[1500px] flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 lg:basis-3/5">
          <div className="h-8 bg-border-gray rounded w-1/2"></div>
          <div className="h-6 bg-border-gray rounded w-3/4"></div>
          <div className="h-20 bg-border-gray rounded w-full"></div>
        </div>

        <div className="flex flex-col lg:basis-2/5 border border-border-gray p-4 rounded bg-white gap-2">
          <div className="h-6 bg-border-gray rounded w-full"></div>
          <div className="h-10 bg-border-gray rounded w-1/2 mt-auto"></div>
        </div>
      </div>
    </div>
  );
};
