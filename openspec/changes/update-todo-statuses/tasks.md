## 1. Shared branch (spec)
- [x] 1.1 Write proposal, tasks, and spec deltas
- [x] 1.2 Validate with `openspec validate update-todo-statuses --strict`
- [ ] 1.3 Both partners approve the API contract before coding

## 2. Partner A — Server (`feature/todo-statuses-server`)
- [ ] 2.1 Add shared `VALID_STATUSES` module (`id` + `label`)
- [ ] 2.2 Add `GET /api/statuses` returning the status list
- [ ] 2.3 Validate status on PUT (and on create if status is sent); return 400 for invalid values
- [ ] 2.4 Keep default status `todo` when creating without status

## 3. Partner B — Client (`feature/todo-statuses-client`)
- [ ] 3.1 Add `api.statuses.getAll()` and load statuses in App
- [ ] 3.2 Replace toggle with status `<select>`; call update with chosen status id
- [ ] 3.3 Add color/icon badge per status
- [ ] 3.4 Group TodoList into four sections (todo, in-progress, in-review, done)

## 4. Shared branch (integrate)
- [ ] 4.1 Merge server branch, then client branch, into shared feature branch
- [ ] 4.2 Update README status values and API table
- [ ] 4.3 Manual smoke-test of statuses endpoint, validation, and UI
