# Specification

## Summary
**Goal:** Implement user registration, approval workflow, and admin dashboard to control access to tasks.

**Planned changes:**
- Add User data model with username, whatsappNumber, groupNumber, email, passwordHash, status (Pending/Approved), and registeredAt timestamp
- Implement registerUser backend function that hashes passwords and creates users with Pending status
- Implement loginUser backend function that only allows Approved users to authenticate
- Implement getAllUsers query and approveUser update functions for admin management
- Wire registration form to backend registerUser function with success/error messaging
- Add login authentication flow with session management
- Add route guards to Task pages that redirect unauthenticated users and show Bengali blocking message for Pending users
- Create Admin Panel page at /admin-panel with basic access control
- Display all registered users in Admin Panel with Name, WhatsApp Number, and Status
- Add Approve button for each Pending user that updates their status and refreshes the list
- Create authentication context/hook to manage user state and persist sessions
- Show success message on Registration page informing users about pending approval

**User-visible outcome:** Users can register accounts that require admin approval before accessing tasks. A hidden admin panel at /admin-panel allows the site owner to view all registered users and approve pending accounts. Only approved users can log in and see task content; pending users see a Bengali message explaining they must wait for approval.
