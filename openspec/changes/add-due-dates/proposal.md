# Change: Add Due Dates to Todos

## Why
Users need optional due dates on tasks so they can track deadlines and quickly spot overdue work.

## What Changes
- Add optional `dueDate` (`YYYY-MM-DD` or null) to the todo data model
- Accept and validate `dueDate` on create and update API endpoints
- Add date pickers on create and edit in the UI
- Show due dates on todo cards with overdue styling
- Add a client-side "Overdue only" filter

## Impact
- Affected specs: todo-persistence, server-api, todo-components
- Affected code: todoService, todos routes, api.js, AddTodo, TodoItem, TodoList, App, App.css, todos.json
