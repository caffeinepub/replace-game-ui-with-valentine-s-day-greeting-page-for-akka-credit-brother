# Specification

## Summary
**Goal:** Deploy the existing Valentine’s wish/Valentine’s Surprise site as a permanent live Internet Computer site using the default platform domain.

**Planned changes:**
- Perform a production/live deployment of the current project to the Internet Computer.
- Use the default `https://<slug>.icp0.io` domain; if a slug is required, generate a random valid slug (5–50 chars, only letters/numbers/hyphens).
- Update in-repo references to the deployed live URL (frontend `LIVE_URL.md` and the live-URL comment in `backend/main.mo`) to match the new permanent URL.

**User-visible outcome:** The site is publicly reachable at an `https://<slug>.icp0.io` URL and serves the current project content without additional manual steps.
