## ADDED Requirements
### Requirement: Priority on Create
The AddTodo component SHALL allow setting priority when creating a todo via a native select.

#### Scenario: Default medium on create form
- **WHEN** the AddTodo form is shown
- **THEN** the priority select defaults to medium

#### Scenario: Create with selected priority
- **WHEN** form is submitted with a non-empty title and a selected priority
- **THEN** onAdd is invoked with title and that priority

### Requirement: Priority Display and Edit
The TodoItem component SHALL display and allow changing priority via a native select, with visual cues for the current level.

#### Scenario: Display priority select
- **WHEN** a todo is rendered
- **THEN** a priority select shows the todo's priority (missing treated as medium)

#### Scenario: Change priority
- **WHEN** the user chooses a different priority in the select
- **THEN** an update callback is invoked with the todo ID and new priority

#### Scenario: Priority visual cue
- **WHEN** a todo is rendered with a given priority
- **THEN** the select and a left accent on the row use the priority color token (low #6b7280, medium #d97706, high #dc2626)

## MODIFIED Requirements
### Requirement: TodoItem Component
The TodoItem component SHALL display a single todo with actions including priority.

#### Scenario: Display todo
- **WHEN** todo is rendered
- **THEN** title, priority select, toggle button, and delete button are shown

#### Scenario: Done styling
- **WHEN** todo status is done
- **THEN** title has strikethrough and opacity is reduced

#### Scenario: Toggle action
- **WHEN** toggle button is clicked
- **THEN** onToggle callback is invoked with todo ID

#### Scenario: Delete action
- **WHEN** delete button is clicked
- **THEN** onDelete callback is invoked with todo ID
