# Change: Add Search and Filter to Todos

## Why
Users need to find tasks quickly instead of scanning the whole list. Today `GET /api/todos`
always returns every todo, so each view would have to implement its own filtering. Filtering
on the server means one implementation serves both the List view and the Board view.

## What Changes
- Add optional `search` query parameter to `GET /api/todos` (case-insensitive substring match on title)
- Add optional `status` query parameter accepting a comma-separated list of status ids
- Add optional `priority` query parameter accepting a comma-separated list of priority values
- Combine filters with AND across parameters and OR within a single parameter
- Return `400` for any unrecognized status or priority value
- Return `200` with an empty array when no todos match
- Keep the response shape a plain JSON array so existing clients are unaffected

## Impact
- Affected specs: server-api, todo-persistence
- Affected code: todos routes, todoService, README
- Depends on: `update-todo-statuses` (status ids), `add-todo-priority` (priority values)
- Non-goals: client search box and filter controls (frontend half of this feature), filtered statistics endpoints, sorting, pagination
