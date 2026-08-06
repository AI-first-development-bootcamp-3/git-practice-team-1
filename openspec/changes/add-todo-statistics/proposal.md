# Change: Add Todo Statistics Page

## Why
Users need a concise view of task progress without transferring every task to the browser for client-side aggregation.

## What Changes
- Add a server-side statistics aggregation service and `GET /api/todos/statistics` endpoint.
- Return a fixed DTO containing total tasks, completion percentage, and counts for all four supported statuses.
- Add a separate Statistics view with Board/Statistics tabs, metric cards, a progress bar, and loading and error states.
- Document the statistics endpoint and verify the client production build.

## Impact
- Affected specs: todo-statistics
- Affected code: `server/src/services/todoService.js`, `server/src/routes/todos.js`, `client/src/services/api.js`, `client/src/components/App.jsx`, `client/src/components/Statistics.jsx`, `client/src/App.css`, `README.md`
