# Change: Add Search and Filter UI (Frontend)

## Why
Users need to find tasks on the board without scanning every column. Dan’s `add-search-filter` defines the server contract; this change owns the client half so the crew can review UI and mock wiring before the backend lands.

## What Changes
- Add board filter controls: search (title), status checkboxes, priority checkboxes, Clear
- Load board todos via `api.todos.getAll({ search, status, priority })`
- Until backend supports query params: client-side mock filter after `GET /api/todos` (mirrors Dan’s rules)
- Flip to real query params with `USE_CLIENT_TODO_FILTERS` (same filter object shape)
- Empty-results copy when filters match nothing
- Keep existing Overdue-only toggle; apply it after search/filter (client-only, not a server param)
- Add crew review guide (`design.md`) and thin Cursor/Claude review commands

## Impact
- Affected specs: todo-components
- Affected code (when implemented): `api.js`, `App.jsx`, new `TodoFilters.jsx`, `TodoList.jsx` empty copy, `App.css`
- Depends on: `add-search-filter` (API contract), statuses + priority already on main
- Non-goals: server filter implementation, filtered Statistics, sorting, pagination
- Review guide: see `design.md` § Reviewer guide; run `/review-search-filter-ui` (Cursor) or OpenSpec: Review Search Filter UI (Claude)
