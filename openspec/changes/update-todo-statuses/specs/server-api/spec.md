## ADDED Requirements
### Requirement: List Statuses Endpoint
The API SHALL provide an endpoint that returns the list of allowed todo statuses.

#### Scenario: Get all statuses
- **WHEN** GET /api/statuses is called
- **THEN** a JSON array is returned where each item has id and label for: todo, in-progress, in-review, done

## MODIFIED Requirements
### Requirement: Create Todo Endpoint
The API SHALL provide an endpoint to create a new todo.

#### Scenario: Create with valid title
- **WHEN** POST /api/todos is called with title in body
- **THEN** new todo is created and returned with 201 status

#### Scenario: Create with empty title
- **WHEN** POST /api/todos is called with empty or missing title
- **THEN** 400 status with error message is returned

#### Scenario: Create with valid dueDate
- **WHEN** POST /api/todos is called with title and a valid dueDate (YYYY-MM-DD)
- **THEN** new todo is created including that dueDate

#### Scenario: Create with invalid dueDate
- **WHEN** POST /api/todos is called with a dueDate that is not YYYY-MM-DD
- **THEN** 400 status with error message is returned

#### Scenario: Create with valid status
- **WHEN** POST /api/todos is called with a status of todo, in-progress, in-review, or done
- **THEN** new todo is created with that status

#### Scenario: Create with invalid status
- **WHEN** POST /api/todos is called with a status that is not allowed
- **THEN** 400 status with error message is returned

### Requirement: Update Todo Endpoint
The API SHALL provide an endpoint to update an existing todo.

#### Scenario: Update existing todo
- **WHEN** PUT /api/todos/:id is called with updates
- **THEN** the todo is updated and returned

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

#### Scenario: Update with valid dueDate
- **WHEN** PUT /api/todos/:id is called with a valid dueDate or null
- **THEN** the todo dueDate is updated and returned

#### Scenario: Update with invalid dueDate
- **WHEN** PUT /api/todos/:id is called with a dueDate that is not YYYY-MM-DD and not null
- **THEN** 400 status with error message is returned

#### Scenario: Update with valid status
- **WHEN** PUT /api/todos/:id is called with status todo, in-progress, in-review, or done
- **THEN** the todo status is updated and returned

#### Scenario: Update with invalid status
- **WHEN** PUT /api/todos/:id is called with a status that is not allowed
- **THEN** 400 status with error message is returned
