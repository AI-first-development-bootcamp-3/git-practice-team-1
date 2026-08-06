## Context
The existing statistics endpoint returns a strict DTO with current status counts. A pie chart can use those counts directly, while a task-creation line chart requires server-side grouping by `createdAt` date.

## Goals / Non-Goals
- Goals: Add accessible SVG pie and line charts, preserve server-side aggregation, and keep the existing statistics DTO unchanged.
- Non-Goals: Add a charting dependency, fetch task records for charting, or provide completion-history analytics.

## Decisions
- Decision: Render both charts with responsive SVG and React, without external dependencies.
- Decision: Build the pie chart from the existing `tasksByStatus` object and include a textual legend with exact counts.
- Decision: Add `GET /api/todos/statistics/created-trend`, returning daily counts sorted by ISO date.
- Decision: Fetch statistics and trend data together when the Statistics view loads.
- Decision: Plot all available daily creation data; empty data shows an explicit empty state and a single point remains visible.

## Risks / Trade-offs
- The JSON persistence layer requires one O(n) server pass per trend request.
- Dates are grouped by the UTC date portion of valid ISO `createdAt` values; invalid dates are omitted from the trend.
