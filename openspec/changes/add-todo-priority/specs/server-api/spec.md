## MODIFIED Requirements
### Requirement: Create Todo Endpoint
The API SHALL provide an endpoint to create a new todo.

#### Scenario: Create with valid title
- **WHEN** POST /api/todos is called with title in body
- **THEN** new todo is created and returned with 201 status

#### Scenario: Create with empty title
- **WHEN** POST /api/todos is called with empty or missing title
- **THEN** 400 status with error message is returned

#### Scenario: Create with optional priority
- **WHEN** POST /api/todos is called with title and a valid priority (low, medium, or high)
- **THEN** new todo is created including that priority

#### Scenario: Create without priority
- **WHEN** POST /api/todos is called with title and no priority
- **THEN** new todo is created with priority "medium"

#### Scenario: Create with invalid priority
- **WHEN** POST /api/todos is called with a priority other than low, medium, or high
- **THEN** 400 status with error message is returned

### Requirement: Update Todo Endpoint
The API SHALL provide an endpoint to update an existing todo.

#### Scenario: Update existing todo
- **WHEN** PUT /api/todos/:id is called with updates
- **THEN** the todo is updated and returned

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

#### Scenario: Update priority
- **WHEN** PUT /api/todos/:id is called with a valid priority (low, medium, or high)
- **THEN** the todo priority is updated and returned

#### Scenario: Omit priority on update
- **WHEN** PUT /api/todos/:id is called without a priority field
- **THEN** the existing priority is left unchanged

#### Scenario: Update with invalid priority
- **WHEN** PUT /api/todos/:id is called with a priority other than low, medium, or high
- **THEN** 400 status with error message is returned

## ADDED Requirements
### Requirement: Priority Present in Todo Responses
Todo JSON returned by the API SHALL always include a priority field of low, medium, or high.

#### Scenario: List includes priority
- **WHEN** GET /api/todos is called
- **THEN** each todo in the array includes priority

#### Scenario: Single todo includes priority
- **WHEN** GET /api/todos/:id is called for an existing todo
- **THEN** the todo includes priority
