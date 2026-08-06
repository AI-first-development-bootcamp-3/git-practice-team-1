## ADDED Requirements

### Requirement: Status Distribution Chart
The Statistics view SHALL display a dependency-free horizontal bar chart representing the current counts for `todo`, `in-progress`, `review`, and `done` from the existing statistics DTO.

#### Scenario: Display populated status distribution
- **WHEN** one or more status counts are greater than zero
- **THEN** the chart displays one labeled bar and the exact count for each of the four statuses

#### Scenario: Display empty status distribution
- **WHEN** all four status counts are zero
- **THEN** the chart displays a clear empty-state message without invalid bar calculations

### Requirement: Accessible Status Comparison
The status chart SHALL communicate each status and exact count through text and SHALL NOT depend on color alone.

#### Scenario: Read chart values
- **WHEN** a user views or navigates the chart with assistive technology
- **THEN** every status label and exact count is available in a meaningful reading order

### Requirement: Existing Statistics Data Reuse
The status chart SHALL derive its values from the already-fetched `tasksByStatus` DTO and SHALL NOT request task records or make an additional statistics request.

#### Scenario: Render chart after statistics load
- **WHEN** the Statistics view receives a successful statistics response
- **THEN** the chart renders from that response without another network request

### Requirement: Responsive Status Chart
The status chart SHALL remain readable within the Statistics view across desktop and narrow mobile layouts.

#### Scenario: View chart on a narrow screen
- **WHEN** the available viewport width is 520 pixels or less
- **THEN** chart labels, bars, and exact counts remain visible without horizontal page scrolling
