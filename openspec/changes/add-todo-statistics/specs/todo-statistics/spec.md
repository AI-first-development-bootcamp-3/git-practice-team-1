## ADDED Requirements

### Requirement: Server-Side Statistics Endpoint
The API SHALL provide `GET /api/todos/statistics` and SHALL calculate statistics on the server without returning task records for client-side aggregation.

#### Scenario: Statistics for existing tasks
- **WHEN** the statistics endpoint is requested and tasks exist
- **THEN** the server returns the total task count, a 0–100 completion percentage, and exact counts for `todo`, `in-progress`, `review`, and `done`

#### Scenario: Statistics for no tasks
- **WHEN** the statistics endpoint is requested and no tasks exist
- **THEN** the server returns zero for the total, percentage, and every status without dividing by zero

### Requirement: Statistics DTO Contract
The statistics endpoint SHALL return `totalTasks` as a number, `completionPercentage` as a number, and `tasksByStatus` containing all four required status keys.

#### Scenario: Status has no matching tasks
- **WHEN** no tasks have one of the required statuses
- **THEN** the corresponding `tasksByStatus` key is present with value zero

### Requirement: Statistics API Client
The client SHALL request the statistics DTO from the dedicated server endpoint when the Statistics view becomes active.

#### Scenario: Statistics view loads
- **WHEN** the user opens the Statistics view
- **THEN** the client fetches `GET /api/todos/statistics` rather than fetching all todos to calculate metrics

### Requirement: Statistics Navigation
The application SHALL provide Board and Statistics tabs that switch between the existing task board and a separate Statistics view.

#### Scenario: Switch views
- **WHEN** the user selects either navigation tab
- **THEN** the corresponding view is displayed and the selected tab is identified

### Requirement: Statistics Metrics Display
The Statistics view SHALL display total tasks, completion percentage with a progress indicator, and counts for all four statuses in card components.

#### Scenario: Statistics request succeeds
- **WHEN** a statistics DTO is received
- **THEN** the view displays every metric from the DTO in a responsive card layout

### Requirement: Statistics Request States
The Statistics view SHALL communicate loading and failure states for its API request.

#### Scenario: Statistics are loading
- **WHEN** the statistics request is pending
- **THEN** a loading indicator is displayed

#### Scenario: Statistics request fails
- **WHEN** the statistics request fails
- **THEN** an error message and retry action are displayed
