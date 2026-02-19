# Specification

## Summary
**Goal:** Update the Admin Panel authentication to use custom credentials (username: 'admin', password: 'habibur123').

**Planned changes:**
- Replace the current admin login credentials in AdminPanelPage.tsx from 'admin'/'admin123' to 'admin'/'habibur123'
- Ensure credentials are not exposed in console logs or client-side debugging
- Test the updated authentication flow including login, user list viewing, and user approval functionality

**User-visible outcome:** Admin can log in to the Admin Panel using the new credentials ('admin'/'habibur123') and manage users as before. The previous credentials no longer work.
