## MODIFIED Requirements
### Requirement: List Todos Endpoint
The API SHALL provide an endpoint to list all todos, optionally narrowed by search text, status, and priority.

#### Scenario: Get all todos
- **WHEN** GET /api/todos is called
- **THEN** all todos are returned as JSON array

#### Scenario: Search by title
- **WHEN** GET /api/todos is called with a search query parameter
- **THEN** only todos whose title contains that text, ignoring case, are returned

#### Scenario: Blank search
- **WHEN** GET /api/todos is called with an empty or whitespace-only search parameter
- **THEN** the search filter is not applied

#### Scenario: Filter by status
- **WHEN** GET /api/todos is called with a status parameter listing one or more allowed status ids
- **THEN** only todos whose status is one of those ids are returned

#### Scenario: Filter by priority
- **WHEN** GET /api/todos is called with a priority parameter listing one or more allowed priority values
- **THEN** only todos whose priority is one of those values are returned

#### Scenario: Combine filters
- **WHEN** GET /api/todos is called with more than one of search, status, and priority
- **THEN** only todos matching every supplied filter are returned

#### Scenario: No matching todos
- **WHEN** GET /api/todos is called with filters that match no todos
- **THEN** 200 status with an empty JSON array is returned

#### Scenario: Invalid status filter
- **WHEN** GET /api/todos is called with a status value that is not an allowed status id
- **THEN** 400 status with error message is returned

#### Scenario: Invalid priority filter
- **WHEN** GET /api/todos is called with a priority value that is not an allowed priority
- **THEN** 400 status with error message is returned
