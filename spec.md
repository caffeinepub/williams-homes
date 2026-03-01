# Williams Homes

## Current State
A property maintenance and consultation booking website for Williams Homes, Goa. Has a backend with consultation bookings, maintenance sign-ups, and an admin panel. The admin system uses a token-based initialization (CAFFEINE_ADMIN_TOKEN) which the owner cannot access, causing "Access Denied" on /admin.

## Requested Changes (Diff)

### Add
- A no-token admin initialization function: the very first logged-in user to visit /admin automatically becomes admin, no token required.

### Modify
- Backend: replace token-gated admin claim with automatic first-caller-becomes-admin logic (no CAFFEINE_ADMIN_TOKEN needed).
- Frontend /admin page: on login, immediately call the new no-token init function so the first user is registered as admin automatically.

### Remove
- Token entry UI on the admin page (no longer needed).

## Implementation Plan
1. Regenerate backend with `initializeNoToken` function that grants admin to the first non-anonymous caller with no token check.
2. Update frontend AdminPage to call `initializeNoToken` after login instead of requiring a token.
