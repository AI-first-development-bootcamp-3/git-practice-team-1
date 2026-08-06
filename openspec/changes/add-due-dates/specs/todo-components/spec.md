## ADDED Requirements
### Requirement: Due Date on Create
The AddTodo component SHALL allow setting an optional due date when creating a todo.

#### Scenario: Create with due date
- **WHEN** form is submitted with a title and a selected due date
- **THEN** onAdd is invoked with title and dueDate

#### Scenario: Create without due date
- **WHEN** form is submitted with a title and no due date
- **THEN** onAdd is invoked with title and dueDate null

### Requirement: Due Date Display and Edit
The TodoItem component SHALL display and allow editing the todo due date.

#### Scenario: Display due date
- **WHEN** a todo with a dueDate is rendered
- **THEN** the due date is shown on the card

#### Scenario: Edit due date
- **WHEN** the user changes the date input
- **THEN** onUpdateDueDate is invoked with the todo ID and new dueDate

#### Scenario: Overdue styling
- **WHEN** a todo has a dueDate before today and status is not done
- **THEN** the item is visually marked as overdue

### Requirement: Overdue Filter
The App SHALL provide a filter to show only overdue todos.

#### Scenario: Overdue only filter
- **WHEN** the overdue-only toggle is enabled
- **THEN** only todos that are overdue are passed to TodoList

#### Scenario: No overdue results
- **WHEN** the overdue-only filter is on and no todos are overdue
- **THEN** an empty-state message is shown
