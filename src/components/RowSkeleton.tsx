function SkeletonCard() {
  return (
    <div className="h-28 min-w-[180px] animate-pulse rounded-md bg-gray-800 md:h-36 md:min-w-[260px]" />
  );
}

function RowSkeleton() {
  return (
    <div className="h-40 space-y-2 md:space-y-4">
      {/* Placeholder for Title */}
      <div className="h-8 w-56 animate-pulse rounded-md bg-gray-800" />

      {/* Placeholder for Thumbnails */}
      <div className="flex items-center space-x-2 overflow-hidden md:space-x-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export default RowSkeleton;
