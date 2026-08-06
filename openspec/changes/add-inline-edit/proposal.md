# Change: Add Inline Title Editing

## Why
Users should be able to rename a todo quickly without a separate edit dialog.

## What Changes
- Clicking a todo title enters inline edit mode
- Save on Enter or blur; cancel on Escape
- Reject empty titles on client and when updating via API
- Visual styling for the inline edit input

## Impact
- Affected specs: todo-components, server-api
- Affected code: TodoItem.jsx, TodoList.jsx, App.jsx, App.css, todos.js routes
