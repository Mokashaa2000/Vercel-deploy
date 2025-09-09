export default function imageLoader({ src, width, quality }) {
  // Remove leading slash for relative paths
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src
  return cleanSrc
}
