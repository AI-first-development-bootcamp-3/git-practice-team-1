## ADDED Requirements
### Requirement: Search and Filter Controls
The Task Board SHALL provide controls to search by title and filter by status and priority.

#### Scenario: Search by title
- **WHEN** the user types in the search box
- **THEN** after a short debounce the board reloads todos using a search filter on title (case-insensitive substring)

#### Scenario: Filter by status
- **WHEN** the user selects one or more status checkboxes
- **THEN** the board shows only todos whose status is one of the selected values

#### Scenario: Filter by priority
- **WHEN** the user selects one or more priority checkboxes
- **THEN** the board shows only todos whose priority is one of the selected values

#### Scenario: Combine filters
- **WHEN** search, status, and/or priority filters are active together
- **THEN** only todos matching every active filter dimension are shown

#### Scenario: Clear filters
- **WHEN** the user clears search and filter controls
- **THEN** the board shows todos without search, status, or priority filters applied

#### Scenario: No matching results
- **WHEN** filters are active and no todos match
- **THEN** a message indicating no todos match the search or filters is shown

### Requirement: Client Todo List Filtering Adapter
The client SHALL request todos through a filter-aware list API that matches the server search/filter query contract, using client-side filtering only while the server query parameters are unavailable.

#### Scenario: Filter-aware getAll
- **WHEN** the board loads or filters change
- **THEN** todos are loaded via getAll with optional search, status list, and priority list

#### Scenario: Mock until backend ready
- **WHEN** client-side todo filtering is enabled
- **THEN** the client fetches the unfiltered todo list and applies the same filter rules locally

#### Scenario: Ready for server filters
- **WHEN** client-side todo filtering is disabled
- **THEN** the client sends search, status, and priority as query parameters on GET /api/todos

### Requirement: Overdue Filter Composition
The existing Overdue-only control SHALL remain client-side and SHALL apply after search and filter results.

#### Scenario: Overdue after filters
- **WHEN** search or status/priority filters are active and Overdue-only is enabled
- **THEN** only overdue todos within the already filtered set are shown

#### Scenario: Overdue is not a server param
- **WHEN** todos are requested for the board
- **THEN** overdue is not sent as a query parameter to the server
