# Specification

## Summary
**Goal:** Rename the blog/site branding to “MHS Habibur Blog” and replace the sample blog content with 5 professional posts about Online Income and Digital Marketing.

**Planned changes:**
- Update all user-facing branding text from “MyBlog” to “MHS Habibur Blog” (header brand text, `frontend/src/lib/siteConfig.ts` metadata, and footer copyright line).
- Replace the existing fallback/sample posts with exactly 5 new professional posts focused on Online Income and/or Digital Marketing in `frontend/src/lib/blogSampleFallback.ts` (each with title, unique slug, excerpt, substantial multi-paragraph content, and published timestamp).
- Update `frontend/public/sitemap.xml` to include URLs for the 5 new blog slugs and remove any URLs for deleted/replaced sample posts.

**User-visible outcome:** The site displays “MHS Habibur Blog” consistently, and the blog section shows 5 new actionable posts with working list and detail pages (and the sitemap reflects the new post URLs).
