## Context
Feature 4 (Priority) from the Task Management Workshop upgrade plan. Implemented end-to-end by the Feature 4 owner while the backend partner is unavailable; the same OpenSpec is the contract for later review.

## Goals / Non-Goals
- Goals: Persist and expose `priority` on todos; validate on write; default/normalize to `medium`; list UI to set and scan priority.
- Non-Goals: Board card priority UI; search/filter by priority; dedicated priority endpoints; new CSS frameworks or icon libraries.

## Decisions
- Decision: `priority` is a field on existing Todo resources (`GET/POST /api/todos`, `PUT /api/todos/:id`), not a separate route.
  - Alternatives considered: `PATCH /api/todos/:id/priority` — rejected as unnecessary surface for a JSON-file workshop API.
- Decision: Allowed values are exactly `"low" | "medium" | "high"` (case-sensitive).
- Decision: Omit on create → store `"medium"`. Omit on update → leave unchanged. Invalid value → `400`.
- Decision: Todos stored without `priority` are normalized on read to `"medium"` (responses always include `priority`).
- Decision: UI uses a native `<select>` in AddTodo and TodoItem; visual cue is select tint + row left accent.
- Decision: Color tokens — low `#6b7280`, medium `#d97706`, high `#dc2626`.
- Decision: Scope is list view only; Board may reuse tokens later.

## Risks / Trade-offs
- Parallel `add-due-dates` touches the same files → merge early/often; keep priority changes focused.
- Normalize-on-read without write-back means the JSON file may lack `priority` until a todo is updated → acceptable for workshop; API consumers still see `medium`.

## Migration Plan
- No mandatory file migration. Normalization happens in the service layer on read.
- Optional: next update of a legacy todo may persist `priority: "medium"` as part of normal write.

## Open Questions
- None for Feature 4 list priority. Feature 5 filter-by-priority waits on Feature 1 + this change.
