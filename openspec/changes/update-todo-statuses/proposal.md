# Change: Expand Todo Statuses

## Why
Teams need more than a binary todo/done toggle. Tasks often move through in-progress and review before they are done, and the API must reject invalid status values so client and server stay aligned.

## What Changes
- Expand allowed todo statuses to: `todo`, `in-progress`, `review`, `done`
- Add `GET /api/statuses` as the single source of truth for status id + label
- Validate status on create/update; reject invalid values with 400
- Replace the binary toggle with a status selector driven by the statuses API
- Show each status clearly in the UI (color/icon badge)
- Group the todo list into four status sections

## Impact
- Affected specs: todo-persistence, server-api, todo-components
- Affected code: server constants/routes/service, client api/App/TodoItem/TodoList/App.css, README
