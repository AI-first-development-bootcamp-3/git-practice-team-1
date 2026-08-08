## 1. Creation Trend API
- [x] 1.1 Add server-side daily grouping of valid task `createdAt` values.
- [x] 1.2 Add `GET /api/todos/statistics/created-trend` with a sorted trend DTO.
- [x] 1.3 Add client API fetch logic and verify populated and empty responses.

## 2. Pie Chart
- [x] 2.1 Create a responsive SVG pie chart from `tasksByStatus`.
- [x] 2.2 Add an accessible legend with status labels and exact counts.
- [x] 2.3 Handle an all-zero status distribution.

## 3. Line Chart
- [x] 3.1 Create a responsive SVG line chart from daily creation counts.
- [x] 3.2 Add readable date and count context for plotted points.
- [x] 3.3 Handle empty and single-point trend data.

## 4. Integration and Validation
- [x] 4.1 Fetch and render both chart datasets on the Statistics view.
- [x] 4.2 Add responsive styles consistent with existing statistics cards.
- [x] 4.3 Verify chart states, client build, lints, and strict OpenSpec validation.
