## ADDED Requirements
### Requirement: Todo Filtering
The service SHALL accept optional filters when listing todos and return only the todos that match all of them.

#### Scenario: No filters supplied
- **WHEN** getAll is called without filters
- **THEN** all todos are returned

#### Scenario: Filter by search text
- **WHEN** getAll is called with a search filter
- **THEN** only todos whose title contains that text, ignoring case, are returned

#### Scenario: Filter by status values
- **WHEN** getAll is called with a list of status values
- **THEN** only todos whose status is one of those values are returned

#### Scenario: Filter by priority values
- **WHEN** getAll is called with a list of priority values
- **THEN** only todos whose priority is one of those values are returned

#### Scenario: Multiple filters combined
- **WHEN** getAll is called with more than one filter
- **THEN** only todos matching every filter are returned

#### Scenario: No todos match
- **WHEN** getAll is called with filters that match no todos
- **THEN** an empty array is returned

#### Scenario: Statistics ignore filters
- **WHEN** getStatistics or getCreatedTrend is called
- **THEN** every todo is included regardless of any list filters
