# Specification

## Summary
**Goal:** Remove Internet Identity authentication from the Admin Panel and restore simple username/password login with credentials admin/habibur123.

**Planned changes:**
- Remove all Internet Identity authentication logic, imports, and UI components from the Admin Panel page
- Implement a simple login form with Username and Password fields styled to match the site's dark theme
- Add frontend authentication logic that verifies username='admin' and password='habibur123', storing session in sessionStorage
- Update getAllUsers query hook to work without Internet Identity authentication
- Trigger getAllUsers query immediately after successful admin login and display user list with Approve buttons
- Ensure UserListTable Approve button calls approveUser without requiring Internet Identity, refreshes the list, and shows success message
- Remove Internet Identity initialization from useActor.ts that blocks admin operations

**User-visible outcome:** Admin can access the admin panel by logging in with username 'admin' and password 'habibur123' in a simple form, view all registered users, and approve pending users with visible Approve buttons—all without Internet Identity authentication.
