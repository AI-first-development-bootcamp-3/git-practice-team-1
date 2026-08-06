# Change: Add Statistics Status Chart

## Why
The Statistics page shows exact status counts, but users cannot quickly compare the relative distribution of tasks across statuses.

## What Changes
- Add a dependency-free horizontal bar chart for `todo`, `in-progress`, `review`, and `done`.
- Reuse the existing statistics DTO without fetching task records or changing the backend.
- Provide accessible labels, values, and an explicit empty state when all counts are zero.
- Add responsive chart styling consistent with the existing Statistics page.

## Impact
- Affected specs: todo-statistics
- Affected code: `client/src/components/Statistics.jsx`, `client/src/components/StatusChart.jsx`, `client/src/App.css`
- Dependencies: none
