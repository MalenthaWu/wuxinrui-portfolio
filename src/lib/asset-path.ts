/** Encode static asset paths for filenames with spaces or non-ASCII characters. */
export function assetPath(path: string): string {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}
