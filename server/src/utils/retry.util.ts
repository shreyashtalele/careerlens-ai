interface RetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  shouldRetry: (error: unknown) => boolean;
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
}

const wait = (delayMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

export const retryOperation = async <T>(
  operation: () => Promise<T>,
  options: RetryOptions,
): Promise<T> => {
  const { maxAttempts, initialDelayMs, shouldRetry, onRetry } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      const hasMoreAttempts = attempt < maxAttempts;
      const canRetry = shouldRetry(error);

      if (!hasMoreAttempts || !canRetry) {
        throw error;
      }

      const delayMs = initialDelayMs * 2 ** (attempt - 1);

      onRetry?.(error, attempt, delayMs);

      await wait(delayMs);
    }
  }

  throw lastError;
};
