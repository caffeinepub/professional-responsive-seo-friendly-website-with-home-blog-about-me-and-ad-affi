# Specification

## Summary
**Goal:** Fix the backend canister connectivity issue causing 'Failed to load users' error in the Admin Panel and improve mobile UI for the Approve button.

**Planned changes:**
- Diagnose and fix backend canister connection in the Admin Panel to resolve 'Failed to load users' error
- Verify getAllUsers query method is properly exposed and callable in backend/main.mo
- Fix getAllUsers query hook to handle responses and display detailed error messages for debugging
- Update AdminPanelPage to trigger user list query automatically after admin login with clear loading/error states
- Reposition Approve button directly below username on mobile screens with adequate touch target size (minimum 44x44px)
- Test complete admin workflow on mobile and desktop to ensure stable functionality

**User-visible outcome:** Admin can log in with existing credentials and immediately see the user list without errors. The Approve button is clearly visible and easily clickable on mobile devices, positioned directly under usernames. The admin panel works reliably on both mobile and desktop screens.
