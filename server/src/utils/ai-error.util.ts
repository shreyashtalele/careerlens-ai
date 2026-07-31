export const isRetryableAIError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes("429") ||
    message.includes("too many requests") ||
    message.includes("resource exhausted") ||
    message.includes("quota") ||
    message.includes("500") ||
    message.includes("502") ||
    message.includes("503") ||
    message.includes("504") ||
    message.includes("unavailable") ||
    message.includes("high demand") ||
    message.includes("timeout") ||
    message.includes("network")
  );
};
