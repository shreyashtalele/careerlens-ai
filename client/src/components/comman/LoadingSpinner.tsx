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
