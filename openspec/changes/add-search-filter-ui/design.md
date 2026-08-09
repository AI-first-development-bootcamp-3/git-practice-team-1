## Context
Feature 5 frontend for the Task Management Workshop. Backend OpenSpec lives in `openspec/changes/add-search-filter` (Dan). This change is FE-only and must not block on server merge.

## Goals / Non-Goals
- Goals: Filterable Task Board UX; API client shape identical to Dan’s query params; mock until server ready; clear crew review path.
- Non-Goals: Implementing `todoService` / route filters; changing Statistics; replacing Overdue-only.

## Decisions
- Decision: Separate change-id `add-search-filter-ui` (not editing Dan’s folder).
- Decision: `api.todos.getAll(filters)` always accepts `{ search?, status?: string[], priority?: string[] }` mapping 1:1 to `?search=&status=&priority=`.
- Decision: `USE_CLIENT_TODO_FILTERS = true` while mocking — fetch all todos, filter in a helper that mirrors Dan’s AND/OR rules; set `false` when backend ships (send query string; drop client filter path).
- Decision: UI = `TodoFilters.jsx`; state in `App.jsx`; live checkboxes; search debounced ~250ms.
- Decision: Overdue-only stays client-side and runs **after** search/status/priority results.
- Decision: Filters on Task Board only.

## Risks / Trade-offs
- Mock can drift from server → mitigate by copying Dan’s scenarios into the helper comments and reviewer checklist; remove mock when flag flips.
- Parallel work with Dan → do not edit `add-search-filter` server files in the FE PR.

## Migration Plan
1. Ship FE with `USE_CLIENT_TODO_FILTERS = true`.
2. When Dan merges query support: set flag `false`, smoke-test same UI against real params, delete unused mock helper if unused.

## Reviewer guide (for the crew)

**What this change is**
- Frontend OpenSpec for board search/filter + (later) UI that talks to Dan’s list API shape.
- Not the server implementation (that is `add-search-filter`).

**Read in this order**
1. `openspec/changes/add-search-filter/proposal.md` — Dan’s API contract (source of truth for query params)
2. `openspec/changes/add-search-filter-ui/proposal.md` — FE why/what
3. `openspec/changes/add-search-filter-ui/design.md` — mock flag + overdue composition (this file)
4. `openspec/changes/add-search-filter-ui/specs/todo-components/spec.md` — UI requirements/scenarios
5. `openspec/changes/add-search-filter-ui/tasks.md` — implementation checklist

**When code lands, review these files**
- `client/src/services/api.js` — `getAll(filters)` + `USE_CLIENT_TODO_FILTERS`
- `client/src/components/TodoFilters.jsx` — controls
- `client/src/components/App.jsx` — filter state, debounce, loadTodos, overdue after filters
- `client/src/components/TodoList.jsx` — empty-results copy
- `client/src/App.css` — filter bar styles only

**Accept if**
- [ ] Filter object matches Dan’s params (`search`, comma-ready status/priority lists)
- [ ] Mock path does not invent new HTTP endpoints
- [ ] Flag to disable client filtering is obvious and documented
- [ ] Overdue is not sent as a query param
- [ ] Statistics page unchanged
- [ ] No edits to Dan’s server OpenSpec ownership without coordination
- [ ] Empty state distinguishes “no matches” vs “no todos yet”

**Reject / request changes if**
- FE calls a non-contract path (e.g. `/api/todos/search`)
- Client filtering diverges from Dan’s AND/OR rules without an OpenSpec note
- Backend files are rewritten “for convenience” in the FE PR

## Open Questions
- None for planning; implementation waits on apply approval.
