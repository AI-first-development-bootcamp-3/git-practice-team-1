## MODIFIED Requirements
### Requirement: Todo Data Model
Each todo SHALL have an id, title, status, priority, createdAt, and updatedAt fields.

#### Scenario: New todo structure
- **WHEN** a todo is created
- **THEN** it has id (UUID), title (string), status (todo|done), priority (low|medium|high), createdAt (ISO date), updatedAt (ISO date)

#### Scenario: Default status
- **WHEN** a todo is created without status
- **THEN** status defaults to "todo"

#### Scenario: Default priority
- **WHEN** a todo is created without priority
- **THEN** priority defaults to "medium"

#### Scenario: Priority provided
- **WHEN** a todo is created with a valid priority (low, medium, or high)
- **THEN** that priority is persisted

#### Scenario: Missing priority on read
- **WHEN** a stored todo has no priority field
- **THEN** it is returned with priority "medium"

## ADDED Requirements
### Requirement: Priority Validation in Persistence
The service SHALL only accept priority values of low, medium, or high when creating or updating a todo.

#### Scenario: Reject invalid priority
- **WHEN** create or update is called with a priority other than low, medium, or high
- **THEN** the operation fails with a validation error
