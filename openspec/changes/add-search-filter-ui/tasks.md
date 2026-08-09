## 1. OpenSpec
- [x] 1.1 Write proposal, design (incl. reviewer guide), tasks, and todo-components deltas
- [x] 1.2 Validate with `openspec validate add-search-filter-ui --strict`
- [x] 1.3 Add Cursor + Claude review commands pointing at this change

## 2. Client API
- [x] 2.1 Extend `api.todos.getAll(filters)` with filter object → query string mapping
- [x] 2.2 Add `USE_CLIENT_TODO_FILTERS` and client filter helper mirroring Dan’s rules
- [x] 2.3 Document flag flip for when `add-search-filter` backend lands

## 3. UI
- [x] 3.1 Add `TodoFilters.jsx` (search, status checkboxes, priority checkboxes, Clear)
- [x] 3.2 Wire filter state + ~250ms search debounce in `App.jsx`; refetch/reload via `getAll`
- [x] 3.3 Apply Overdue-only after search/filter results
- [x] 3.4 Empty copy: “No todos match your search or filters.”
- [x] 3.5 Style filter bar in `App.css`

## 4. Verify
- [x] 4.1 Manual: search, status, priority, combined, clear, empty results, overdue composition
- [x] 4.2 Confirm Statistics unchanged; no server route edits required for mock mode
