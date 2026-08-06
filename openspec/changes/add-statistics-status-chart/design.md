## Context
The Statistics page already receives exact counts in `tasksByStatus` from `GET /api/todos/statistics`. The client has no charting dependency and the workshop favors simple, offline-capable implementations.

## Goals / Non-Goals
- Goals: Make status distribution easy to compare, remain accessible and responsive, and reuse the existing DTO.
- Non-Goals: Add charting dependencies, change backend aggregation, fetch task records, or add historical trend data.

## Decisions
- Decision: Render a reusable horizontal bar chart with React markup and CSS.
- Decision: Scale each bar against the largest status count so relative differences remain visible even when no status contains most tasks.
- Decision: Display the exact count beside each bar and expose the label and value as text rather than relying on color.
- Decision: Show a clear empty state when all four counts are zero.

## Risks / Trade-offs
- Bars compare the current distribution only; they do not communicate changes over time.
- Scaling against the largest count prioritizes comparison between statuses rather than percentage of all tasks.
