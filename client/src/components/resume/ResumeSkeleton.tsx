import { SkeletonCard } from "@/components/comman";

export function ResumeDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded mt-2" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-20 bg-gray-200 rounded" />
          <div className="h-10 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        {/* Personal Details */}
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="h-4 w-20 bg-gray-200 rounded mb-1" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-100 pt-4">
          <div className="h-5 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
        </div>

        {/* Skills */}
        <div className="border-t border-gray-100 pt-4">
          <div className="h-5 w-20 bg-gray-200 rounded mb-3" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="border-t border-gray-100 pt-4">
          <div className="h-5 w-28 bg-gray-200 rounded mb-3" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded mt-1" />
              <div className="h-4 w-24 bg-gray-200 rounded mt-1" />
              <div className="h-4 w-full bg-gray-200 rounded mt-2" />
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="border-t border-gray-100 pt-4">
          <div className="h-5 w-28 bg-gray-200 rounded mb-3" />
          {Array.from({ length: 1 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded mt-1" />
              <div className="h-4 w-24 bg-gray-200 rounded mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResumeListSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-32 bg-gray-200 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
