import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { SITE } from "@/config";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) return [];

  const posts = await getCollection("blog");
  return posts
    .filter(({ data }) => !data.draft && !data.ogImage)
    .map((post) => ({
      params: { slug: post.slug },
      props: { post },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, { status: 404 });
  }

  const buffer = await generateOgImageForPost(props.post);
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};