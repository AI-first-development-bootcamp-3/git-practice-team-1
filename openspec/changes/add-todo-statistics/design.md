## Context
The application stores todos in a JSON file and currently sends complete todo records to the board. Statistics must be calculated server-side and returned as a summary DTO.

## Goals / Non-Goals
- Goals: Server-only aggregation, a stable four-status response, zero-safe completion percentage, and a separate responsive Statistics view.
- Non-Goals: Replacing JSON persistence, adding a router dependency, or changing the board's existing two-state todo workflow.

## Decisions
- Decision: Aggregate in one pass immediately after reading the JSON file. This is the file-storage equivalent of database `COUNT` and `GROUP BY` and avoids transferring task records to the Statistics view.
- Decision: Use `GET /api/todos/statistics` to match the existing `/api/todos` resource naming.
- Decision: Express `completionPercentage` on a 0–100 scale so it can directly drive the UI progress bar.
- Decision: Use in-app Board/Statistics tabs because the client has no router and does not require deep links.
- Alternatives considered: Adding a database or React Router would increase workshop complexity without improving this feature's required behavior.

## Risks / Trade-offs
- Reading JSON remains O(n) because the current storage has no indexes. A single pass and a summary-only response minimize overhead within that constraint.
- Existing todos use only `todo` and `done`; `in-progress` and `review` remain zero until such records exist.

## Migration Plan
No data migration is required. The endpoint and view are additive and can be rolled back by removing their route, service method, and client components.
