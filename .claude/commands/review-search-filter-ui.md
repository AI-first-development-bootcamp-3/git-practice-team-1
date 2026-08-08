---
name: OpenSpec: Review Search Filter UI
description: Guide a crew review of the Feature 5 search/filter UI OpenSpec (and code when present)
category: OpenSpec
tags: [openspec, review, search, filter, frontend]
---

# Review: Search & Filter UI (`add-search-filter-ui`)

Use this when reviewing Jordan’s frontend search/filter work. **Do not implement code** unless the user explicitly asks.

## Source of truth
1. Dan’s API contract: `openspec/changes/add-search-filter/`
2. FE change: `openspec/changes/add-search-filter-ui/`
3. Reviewer checklist: `openspec/changes/add-search-filter-ui/design.md` → **Reviewer guide**

## Steps for the reviewer (or AI assisting a review)
1. Run `openspec show add-search-filter-ui` and `openspec validate add-search-filter-ui --strict`.
2. Read Dan’s proposal so you know the real query params (`search`, `status`, `priority`).
3. Walk the Reviewer guide checklist in `design.md` (Accept / Reject bullets).
4. If app code is in the PR, inspect only:
   - `client/src/services/api.js`
   - `client/src/components/TodoFilters.jsx`
   - `client/src/components/App.jsx`
   - `client/src/components/TodoList.jsx`
   - `client/src/App.css` (filter styles)
5. Confirm **no** unnecessary server edits and **no** Statistics filter scope creep.
6. Summarize for the crew: what’s in scope, mock vs real flag, any blockers for Dan.

## Remember
- Overdue-only is client-side and is **not** a server query param.
- Mock mode must not invent new endpoints; it filters after `GET /api/todos`.
- Look for `USE_CLIENT_TODO_FILTERS` in `api.js` — set `false` when Dan’s backend query params ship.
- Review commands for the crew: Cursor `/review-search-filter-ui`, Claude **OpenSpec: Review Search Filter UI**.
