## ADDED Requirements
### Requirement: Inline Title Editing
The TodoItem component SHALL allow editing the todo title inline.

#### Scenario: Enter edit mode
- **WHEN** the user clicks the todo title
- **THEN** the title becomes a text input focused for editing

#### Scenario: Save on Enter
- **WHEN** the user presses Enter with a non-empty title
- **THEN** onUpdateTitle is invoked and edit mode ends

#### Scenario: Save on blur
- **WHEN** the input loses focus with a non-empty title
- **THEN** onUpdateTitle is invoked and edit mode ends

#### Scenario: Cancel on Escape
- **WHEN** the user presses Escape while editing
- **THEN** edit mode ends without calling onUpdateTitle and the original title is restored

#### Scenario: Empty title rejected
- **WHEN** the user tries to save an empty or whitespace-only title
- **THEN** the title is not saved and edit mode remains active (or restores previous title without persisting empty)
