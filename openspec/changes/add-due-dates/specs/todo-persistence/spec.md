## MODIFIED Requirements
### Requirement: Todo Data Model
Each todo SHALL have an id, title, status, createdAt, updatedAt, and optional dueDate fields.

#### Scenario: New todo structure
- **WHEN** a todo is created
- **THEN** it has id (UUID), title (string), status (todo|done), createdAt (ISO date), updatedAt (ISO date), and dueDate (YYYY-MM-DD string or null)

#### Scenario: Default status
- **WHEN** a todo is created without status
- **THEN** status defaults to "todo"

#### Scenario: Optional due date
- **WHEN** a todo is created without a dueDate
- **THEN** dueDate is stored as null

#### Scenario: Due date provided
- **WHEN** a todo is created with a valid dueDate
- **THEN** dueDate is persisted as a YYYY-MM-DD string
