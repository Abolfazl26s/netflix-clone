function BannerSkeleton() {
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      {/* Placeholder for the background image */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen animate-pulse bg-gray-800" />

      {/* Placeholder for Title */}
      <div className="h-10 w-3/4 animate-pulse rounded-md bg-gray-700 md:h-12 lg:w-1/2" />
      {/* Placeholder for Description */}
      <div className="h-6 w-full animate-pulse rounded-md bg-gray-700 md:w-3/4 lg:w-1/3" />

      {/* Placeholder for Buttons */}
      <div className="flex space-x-3">
        <div className="h-12 w-32 animate-pulse rounded-md bg-gray-700" />
        <div className="h-12 w-32 animate-pulse rounded-md bg-gray-700" />
      </div>
    </div>
  );
}

export default BannerSkeleton;
