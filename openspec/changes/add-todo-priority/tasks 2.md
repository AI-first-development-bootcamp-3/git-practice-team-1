## 1. Persistence & API
- [x] 1.1 Add `priority` to todo create/update in todoService (default `medium`; normalize missing on read)
- [x] 1.2 Validate `priority` on POST and PUT routes (`low` | `medium` | `high` only; invalid → 400)

## 2. Client
- [x] 2.1 Update api.js create/update to send `priority`
- [x] 2.2 Add priority `<select>` to AddTodo (default medium)
- [x] 2.3 Add priority `<select>` to TodoItem and wire change handler
- [x] 2.4 Add CSS tokens and styles for select tint + left accent (low/medium/high)
