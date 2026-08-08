# todo-components Specification

## Purpose
TBD - created by archiving change add-todo-components. Update Purpose after archive.
## Requirements
### Requirement: App Component
The App component SHALL manage todo state and coordinate child components.

#### Scenario: Initial load
- **WHEN** app mounts
- **THEN** todos are fetched from API and displayed

#### Scenario: Loading state
- **WHEN** todos are being fetched
- **THEN** loading indicator is shown

#### Scenario: Error display
- **WHEN** API error occurs
- **THEN** error message is displayed with dismiss button

### Requirement: TodoList Component
The TodoList component SHALL display todos grouped by status.

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** message "No todos yet. Add one above!" is shown

#### Scenario: Grouped display
- **WHEN** todos exist
- **THEN** they are grouped into "To Do" and "Done" sections

#### Scenario: Section counts
- **WHEN** sections are displayed
- **THEN** each section header shows item count

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

### Requirement: AddTodo Component
The AddTodo component SHALL provide a form to create new todos.

#### Scenario: Form submission
- **WHEN** form is submitted with non-empty title
- **THEN** onAdd callback is invoked and input is cleared

#### Scenario: Empty validation
- **WHEN** input is empty
- **THEN** add button is disabled

### Requirement: Visual Design
The UI SHALL follow a clean, minimal design with consistent styling.

#### Scenario: Brand header
- **WHEN** app is displayed
- **THEN** header has blue background (#4361ee) with title

#### Scenario: Interactive feedback
- **WHEN** user hovers over todo item
- **THEN** shadow increases and delete button appears

#### Scenario: Responsive layout
- **WHEN** app is viewed
- **THEN** content is centered with max-width of 600px

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

