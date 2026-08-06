# Change: Add Statistics Pie and Line Charts

## Why
Users can compare status counts with the existing bar chart, but they also need a proportional status overview and a view of task creation activity over time.

## What Changes
- Add a dependency-free SVG pie chart using the existing `tasksByStatus` statistics.
- Add a server-aggregated daily task-creation trend endpoint without changing the strict statistics DTO.
- Add a dependency-free responsive SVG line chart for the daily creation trend.
- Handle empty and single-point chart data accessibly.

## Impact
- Affected specs: todo-statistics
- Affected code: `server/src/services/todoService.js`, `server/src/routes/todos.js`, `client/src/services/api.js`, `client/src/components/Statistics.jsx`, new chart components, `client/src/App.css`
- Dependencies: none
