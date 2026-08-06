## 1. OpenSpec
- [x] 1.1 Write proposal, tasks, and spec deltas
- [x] 1.2 Validate with `openspec validate update-todo-statuses --strict`

## 2. Server
- [x] 2.1 Add shared `VALID_STATUSES` module (`id` + `label`)
- [x] 2.2 Add `GET /api/statuses` returning the status list
- [x] 2.3 Validate status on PUT (and on create if status is sent); return 400 for invalid values
- [x] 2.4 Keep default status `todo` when creating without status
- [x] 2.5 Add sample in-progress / review todos for demos

## 3. Client
- [x] 3.1 Add `api.statuses.getAll()` and load statuses in App
- [x] 3.2 Replace toggle with status `<select>`; call update with chosen status id
- [x] 3.3 Add color/icon badge per status
- [x] 3.4 Group TodoList into four sections (todo, in-progress, review, done)

## 4. Docs & verify
- [x] 4.1 Update README status values and API table
- [x] 4.2 Manual smoke-test of statuses endpoint, validation, and UI
