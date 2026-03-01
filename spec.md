# Williams Homes

## Current State
Full-stack property management website for Williams Homes, Goa. Has consultation booking, maintenance quote forms, admin dashboard, and a Goa-themed design. Admin access currently requires `CAFFEINE_ADMIN_TOKEN` to be present as an environment variable, causing "Access Denied" issues when the token is unavailable.

## Requested Changes (Diff)

### Add
- Richer Goa traditional theme: Portuguese tile patterns, terracotta / saffron / deep teal / frangipani white color palette, traditional azulejo tile-inspired decorative elements, coconut palm motifs, Konkani cultural touches
- New decorative section dividers with tile patterns

### Modify
- Backend: `_initializeAccessControlWithSecret` to not require CAFFEINE_ADMIN_TOKEN — instead, first person to call this function becomes admin, everyone else gets user role
- `access-control.mo` `initialize` function: remove `adminToken` / `userProvidedToken` comparison, simply assign first caller as admin
- `MixinAuthorization.mo`: remove envVar lookup, just call `AccessControl.initialize` with caller
- `AdminPage.tsx`: remove the token claim form completely, auto-grant admin on first login, show simple "Access Denied" to non-admins
- `useQueries.ts`: `useInitializeAccess` mutation simplified — no token arg needed
- `index.css`: Deeper Goa traditional palette — terracotta primary, saffron accent, deep teal secondary tones, enhanced tile-border pattern

### Remove
- Admin token claim form from AdminPage
- Token instructions and "Where to find your token" section
- `CAFFEINE_ADMIN_TOKEN` dependency from backend mixin

## Implementation Plan
1. Update `access-control.mo` — remove token comparison, first caller = admin
2. Update `MixinAuthorization.mo` — remove envVar lookup, call initialize directly
3. Update `useQueries.ts` — simplify `useInitializeAccess` to not pass token
4. Update `AdminPage.tsx` — remove token form, auto-register on login
5. Update `index.css` — enhance Goa traditional theme colors and tile patterns
6. Update `HomePage.tsx` and other pages with enhanced Goa cultural elements
