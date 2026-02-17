# Specification

## Summary
**Goal:** Simplify the Home page and move the Daily Task experience into a new Tasks navigation area with dedicated Task 1–3 pages.

**Planned changes:**
- Update the Home page ("/") to render only the existing Welcome section plus a single prominent "Join My Team" call-to-action button; remove the Daily Task section and all other existing Home sections (hero, TimeBucks sections, TranscribeMe card, ad banner block, feature cards, and "Latest from the Blog").
- Implement the "Join My Team" button with a defined in-app destination route and styling consistent with the existing neon button system (including accessible focus styles).
- Add a new top-level desktop header navigation item "Tasks" with sub-links "Task 1", "Task 2", and "Task 3".
- Add a "Tasks" section to the mobile menu with links "Task 1", "Task 2", and "Task 3", while keeping the existing Bengali-labeled sections (“কাজ”, “পেমেন্ট প্রুফ”, “সাহায্য”) and their current behavior unchanged (including existing Admin 1/Admin 2 Facebook links).
- Create and register three new routes/pages for Task 1, Task 2, and Task 3 in the TanStack Router route tree, each with SEO metadata via the existing Seo component.
- On each Task page, render the existing task interaction UI: a "Start Work" button (opens the task link in a new tab/window) and a "Secret Code" input with "Submit" that shows an on-page success message and clears the input without reload/navigation.
- Update `frontend/public/sitemap.xml` to include the new Task 1/2/3 URLs while preserving existing entries.

**User-visible outcome:** The homepage is streamlined to only the welcome message and a "Join My Team" button, and users can access Task 1–3 from a new Tasks menu on desktop and mobile, each task having its own page with the Start Work and Secret Code submission UI.
