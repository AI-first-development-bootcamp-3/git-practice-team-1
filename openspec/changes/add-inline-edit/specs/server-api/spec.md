## MODIFIED Requirements
### Requirement: Update Todo Endpoint
The API SHALL provide an endpoint to update an existing todo.

#### Scenario: Update existing todo
- **WHEN** PUT /api/todos/:id is called with updates
- **THEN** the todo is updated and returned

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

#### Scenario: Update dueDate
- **WHEN** PUT /api/todos/:id is called with a valid dueDate or null
- **THEN** the todo dueDate is updated and returned

#### Scenario: Update with invalid dueDate
- **WHEN** PUT /api/todos/:id is called with a dueDate that is not YYYY-MM-DD and not null
- **THEN** 400 status with error message is returned

#### Scenario: Update with empty title
- **WHEN** PUT /api/todos/:id is called with an empty or whitespace-only title
- **THEN** 400 status with error message is returned
