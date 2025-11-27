export default function ProductSkeleton() {
  return (
    <div className="mx-auto pb-8 bg-[#FAFAFA]">
      <div className="grid grid-cols-1 max-w-5xl mx-auto lg:grid-cols-2 gap-8">
        {/* Left Section - Image Skeleton */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative bg-neutral-200 overflow-hidden aspect-4/5">
            <div className="absolute inset-0 shimmer"></div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative aspect-square bg-neutral-200 overflow-hidden rounded"
              >
                <div className="absolute inset-0 shimmer"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Details Skeleton */}
        <div className="space-y-4">
          {/* Title */}
          <div className="pt-4 space-y-2">
            <div className="h-8 bg-neutral-200 rounded w-3/4 overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-8 bg-neutral-200 rounded w-1/2 overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>

          {/* Price */}
          <div className="h-7 bg-neutral-200 rounded w-32 overflow-hidden relative">
            <div className="absolute inset-0 shimmer"></div>
          </div>

          {/* Availability */}
          <div className="h-5 bg-neutral-200 rounded w-40 overflow-hidden relative">
            <div className="absolute inset-0 shimmer"></div>
          </div>

          {/* Description */}
          <div className="pt-2 space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-full overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 bg-neutral-200 rounded w-full overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 bg-neutral-200 rounded w-5/6 overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2 pt-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-5 bg-neutral-200 rounded w-2/3 overflow-hidden relative"
              >
                <div className="absolute inset-0 shimmer"></div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-6">
            <div className="h-10 bg-neutral-200 rounded-2xl w-32 overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
