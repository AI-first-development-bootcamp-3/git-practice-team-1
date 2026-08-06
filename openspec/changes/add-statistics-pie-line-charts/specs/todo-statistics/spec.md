## ADDED Requirements

### Requirement: Daily Task Creation Trend API
The API SHALL provide `GET /api/todos/statistics/created-trend` and SHALL group valid task creation timestamps by UTC calendar date on the server.

#### Scenario: Return task creation trend
- **WHEN** the trend endpoint is requested and tasks have valid creation timestamps
- **THEN** it returns `tasksCreatedByDate` as ascending ISO-date and count entries

#### Scenario: No valid trend data
- **WHEN** no tasks have valid creation timestamps
- **THEN** it returns an empty `tasksCreatedByDate` array

### Requirement: Status Pie Chart
The Statistics view SHALL display a dependency-free SVG pie chart using the existing `tasksByStatus` DTO.

#### Scenario: Display status proportions
- **WHEN** at least one status count is greater than zero
- **THEN** proportional pie segments and a textual legend show all statuses and exact counts

#### Scenario: No status data
- **WHEN** all status counts are zero
- **THEN** the pie chart displays a clear empty state

### Requirement: Task Creation Line Chart
The Statistics view SHALL display a dependency-free SVG line chart using the server-provided daily task creation trend.

#### Scenario: Display multiple trend points
- **WHEN** the trend contains multiple dates
- **THEN** the chart plots the ordered daily counts as connected points with date and count context

#### Scenario: Display one trend point
- **WHEN** the trend contains one date
- **THEN** the chart displays a visible point and its date and count without invalid geometry

#### Scenario: No trend points
- **WHEN** the trend is empty
- **THEN** the line chart displays a clear empty state

### Requirement: Chart Data Loading
The client SHALL fetch the statistics DTO and creation-trend DTO without fetching task records when the Statistics view loads.

#### Scenario: Load chart data
- **WHEN** the Statistics view becomes active
- **THEN** both summary and trend endpoints are requested and the charts render from their DTOs
