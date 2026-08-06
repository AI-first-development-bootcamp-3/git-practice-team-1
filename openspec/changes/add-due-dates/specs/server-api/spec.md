## MODIFIED Requirements
### Requirement: Create Todo Endpoint
The API SHALL provide an endpoint to create a new todo.

#### Scenario: Create with valid title
- **WHEN** POST /api/todos is called with title in body
- **THEN** new todo is created and returned with 201 status

#### Scenario: Create with empty title
- **WHEN** POST /api/todos is called with empty or missing title
- **THEN** 400 status with error message is returned

#### Scenario: Create with optional dueDate
- **WHEN** POST /api/todos is called with title and a valid dueDate (YYYY-MM-DD)
- **THEN** new todo is created including that dueDate

#### Scenario: Create with invalid dueDate
- **WHEN** POST /api/todos is called with a dueDate that is not YYYY-MM-DD
- **THEN** 400 status with error message is returned

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
