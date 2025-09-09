// Custom loader for static assets
export function getStaticPath(path) {
  // Remove leading slash and return relative path
  return path.startsWith("/") ? path.slice(1) : path
}
