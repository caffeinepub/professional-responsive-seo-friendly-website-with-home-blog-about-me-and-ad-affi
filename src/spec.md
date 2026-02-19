# Specification

## Summary
**Goal:** Fix the "useAuth must be used within an AuthProvider" error by properly wrapping the app with AuthProvider in main.tsx.

**Planned changes:**
- Update frontend/src/main.tsx to wrap the App component with AuthProvider from frontend/src/hooks/useAuthContext.tsx
- Ensure AuthProvider wraps both QueryClientProvider and RouterProvider so authentication context is available globally
- Verify the provider hierarchy allows useAuth hook to work in all child components including Registration and Login pages

**User-visible outcome:** Users can successfully access the Registration and Login pages without encountering authentication context errors, and authentication state persists across navigation.
