import { slugifyStr } from "./slugify";

/**
 * Get full path of a blog post
 * @param id - id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include `/posts` in return value
 * @returns blog post path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true
) {
  const pathSegments = filePath
    ?.split("/")
    .filter((path) => path !== "")
    .filter((path) => !path.startsWith("_"))
    .slice(0, -1)
    .map((segment) => slugifyStr(segment));

  const basePath = includeBase ? "/posts" : "";

  // Ensure id is always a string slug
  const slug = id.split("/").pop() ?? id;

  // If no folder structure exists, return simple path
  if (!pathSegments || pathSegments.length < 1) {
    return `${basePath}/${slug}`;
  }

  return `${basePath}/${[...pathSegments, slug].join("/")}`;
}