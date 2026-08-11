// Loading Spinner
interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
};

export function LoadingSpinner({
  fullScreen = false,
  size = "md",
  message,
  className = "",
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="text-gray-500 text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size="lg" message="Loading..." />
    </div>
  );
}

// ============================================
// SKELETON LOADERS
// ============================================

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function SkeletonCard({ className = "", count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-200 rounded-2xl p-6 ${className}`}
        >
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
        </div>
      ))}
    </>
  );
}

export function SkeletonText({ className = "", count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-200 rounded h-4 ${className}`}
        />
      ))}
    </>
  );
}

export function SkeletonAvatar({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-300 rounded-full ${className}`} />
  );
}

export function ResumeSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SkeletonText className="w-48 h-8" />
        <SkeletonText className="w-24 h-10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <SkeletonText className="w-32 h-10" />
        <SkeletonText className="w-24 h-10" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <SkeletonAvatar className="w-20 h-20" />
          <div className="space-y-2 flex-1">
            <SkeletonText className="w-48 h-6" />
            <SkeletonText className="w-32 h-4" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-t border-gray-100 pt-4">
            <SkeletonText className="w-24 h-5 mb-2" />
            <SkeletonText className="w-full h-4" />
            <SkeletonText className="w-2/3 h-4 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
