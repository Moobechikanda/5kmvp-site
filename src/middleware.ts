import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // 1. Force root → www
  if (url.hostname === "5kmvp.com") {
    return Response.redirect(
      `https://www.5kmvp.com${url.pathname}${url.search}`,
      301
    );
  }

  // 2. Handle blog subdomain paths (safety fallback)
  if (url.hostname === "blog.5kmvp.com") {
    return Response.redirect(
      `https://www.5kmvp.com${url.pathname}${url.search}`,
      301
    );
  }

  // 3. OLD BACKLINK REDIRECTS (CRITICAL SEO RECOVERY)
  const redirects: Record<string, string> = {
    "/blog/2013/09/17/redefining-mvp-minimum-valuable-product":
      "/posts/best-tools-to-build-an-mvp-as-a-solopreneur-in-2026",

    "/blog/2013/09/21/5-things-you-need-to-know-before-trying-to-scale":
      "/posts/top-problems-solopreneurs-want-to-solve",
    
    "/analysis-of-market-demand-for-web-programming":
      "/posts/market-demand-for-programming-languages-in-2025"
  };

  const redirectTarget = redirects[url.pathname];

  if (redirectTarget) {
    return Response.redirect(
      `https://www.5kmvp.com${redirectTarget}`,
      301
    );
  }

  return next();
});