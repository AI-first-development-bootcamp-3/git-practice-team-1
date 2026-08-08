# Change: Add Priority to Todos

## Why
Users need a priority level on each task so they can see what is urgent and adjust urgency without leaving the list view.

## What Changes
- Add required `priority` (`low` | `medium` | `high`) to the todo data model, defaulting to `medium`
- Accept and validate `priority` on existing create and update API endpoints (no dedicated priority route)
- Normalize missing `priority` on read to `medium` for legacy todos
- Add a native `<select>` on create and on each list item to set/change priority
- Show priority visually via select tint and a left accent bar using agreed color tokens

## Impact
- Affected specs: todo-persistence, server-api, todo-components
- Affected code: todoService, todos routes, api.js, AddTodo, TodoItem, App.css (and App wiring as needed)
- Parallel active change: `add-due-dates` (coordinate merges on shared Todo model/API/UI files)
- Non-goals: Board view (Feature 2), search/filter by priority (Feature 5)
