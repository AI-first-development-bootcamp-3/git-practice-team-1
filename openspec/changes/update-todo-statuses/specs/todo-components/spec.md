## ADDED Requirements
### Requirement: Status Options From API
The App SHALL load allowed statuses from the server and pass them to todo UI that needs them.

#### Scenario: Load statuses on mount
- **WHEN** the app mounts
- **THEN** statuses are fetched from GET /api/statuses

#### Scenario: Selector uses server list
- **WHEN** a todo status control is rendered
- **THEN** its options match the id and label values returned by the API

### Requirement: Change Todo Status
The TodoItem component SHALL let the user change a todo to any allowed status.

#### Scenario: Status select shown
- **WHEN** a todo is rendered
- **THEN** a status selector shows the current status

#### Scenario: Status change action
- **WHEN** the user selects a different status
- **THEN** onStatusChange is invoked with the todo ID and new status id

### Requirement: Status Visual Indicator
The TodoItem component SHALL display status with a clear visual indicator.

#### Scenario: Badge per status
- **WHEN** a todo is rendered
- **THEN** a color and icon (or equivalent badge) identifies its status

#### Scenario: Done styling retained
- **WHEN** todo status is done
- **THEN** title has strikethrough and opacity is reduced

## MODIFIED Requirements
### Requirement: TodoList Component
The TodoList component SHALL display todos grouped by status.

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** message "No todos yet. Add one above!" is shown

#### Scenario: Grouped display
- **WHEN** todos exist
- **THEN** they are grouped into To Do, In Progress, In Review, and Done sections

#### Scenario: Section counts
- **WHEN** sections are displayed
- **THEN** each section header shows item count

### Requirement: TodoItem Component
The TodoItem component SHALL display a single todo with actions.

#### Scenario: Display todo
- **WHEN** todo is rendered
- **THEN** title, status control, and delete button are shown

#### Scenario: Done styling
- **WHEN** todo status is done
- **THEN** title has strikethrough and opacity is reduced

#### Scenario: Status change action
- **WHEN** a new status is selected
- **THEN** onStatusChange callback is invoked with todo ID and status id

#### Scenario: Delete action
- **WHEN** delete button is clicked
- **THEN** onDelete callback is invoked with todo ID
