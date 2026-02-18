# Specification

## Summary
**Goal:** Embed the provided Google Form directly on the Registration page and ensure the `/registration` route is live and reliably accessible.

**Planned changes:**
- Update `frontend/src/lib/registrationConfig.ts` to set `registrationConfig.googleFormEmbedUrl` to an iframe-compatible embed URL for `https://forms.gle/HFbiXDq74sSw1tPg6`.
- Ensure the Registration page at `/registration` renders the embedded form (not a placeholder) and is usable (including scrolling) on mobile and desktop.
- Verify `/registration` remains registered in the TanStack Router and that SPA fallback entrypoints for `/registration` continue to serve the app on direct load/refresh without 404.

**User-visible outcome:** Users can navigate to `/registration` and fill out the Google Form directly on the website, including on mobile and after refreshing the page.
