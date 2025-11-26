export default function BookCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Book Cover Skeleton */}
      <div className="relative aspect-4/5 bg-gray-300 rounded-lg mb-4" />

      {/* Book Info Skeleton */}
      <div className="space-y-2">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-5 bg-gray-300 rounded w-1/2" />

        {/* Category Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/3" />

        {/* Price Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-300 rounded w-12" />
          <div className="h-5 bg-gray-300 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
