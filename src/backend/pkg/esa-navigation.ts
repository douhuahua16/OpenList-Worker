/** ESA page navigation must never intercept download or API endpoints. */
export function isEsaPageNavigation(request: Request): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false
  const path = new URL(request.url).pathname
  if (/^\/(?:api|d|p|sd|raw|dav|s3|health|healthz)(?:\/|$)/i.test(path)) return false
  if (/^\/kv-/i.test(path)) return false
  return request.headers.get("Sec-Fetch-Mode") === "navigate" ||
    (request.headers.get("Accept") || "").includes("text/html")
}
