# Specification

## Summary
**Goal:** Update global SEO metadata, ensure search indexing is allowed, and switch the header branding to the uploaded logo for H★S Earn Platform.

**Planned changes:**
- Update the global SEO defaults in `frontend/src/lib/siteConfig.ts` so Meta Title is exactly `H★S Online Earn Platform | Md. Habibur Rahman` and Meta Description is exactly `Join H★S Online Earn Platform for easy online typing and data entry jobs. Start earning today with free training from Md. Habibur Rahman.`.
- Ensure the homepage (`/`) does not override the global SEO title/description with conflicting per-page metadata.
- Verify indexing is enabled: keep `frontend/public/robots.txt` allowing crawling and referencing `/sitemap.xml`, remove/avoid any runtime `noindex`, and add an explicit `robots` meta tag in `frontend/index.html` if needed to allow `index,follow`.
- Replace visible header brand text `MHS Habibur Blog` with the uploaded logo image (`/assets/generated/site-logo-header.dim_512x512.png`) in `frontend/src/components/layout/SiteHeader.tsx`, with appropriate sizing on mobile/desktop and descriptive English alt text including “H★S Online Earn Platform” and “Md. Habibur Rahman”.

**User-visible outcome:** The site shows the correct global SEO title/description, is indexable by search engines, and the header displays the uploaded logo instead of the old brand text on both desktop and mobile.
