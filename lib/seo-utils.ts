export function getBaseUrl(): string {
  // For production, use your actual domain
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_BASE_URL || "https://mkprofit.co"
  }

  // For development
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}