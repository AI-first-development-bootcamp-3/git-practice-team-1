## 1. OpenSpec
- [x] 1.1 Write proposal, tasks, and spec deltas
- [x] 1.2 Validate with `openspec validate add-search-filter --strict`

## 2. Server
- [x] 2.1 Accept optional `filters` argument in `todoService.getAll`
- [x] 2.2 Match `search` as a case-insensitive substring of title
- [x] 2.3 Match `status` and `priority` against their allowed value lists (OR within, AND across)
- [x] 2.4 Parse and validate query parameters in the `GET /api/todos` route
- [x] 2.5 Return 400 for unrecognized status or priority values
- [x] 2.6 Leave the statistics endpoints unfiltered

## 3. Docs & verify
- [x] 3.1 Document the query parameters in the README API table
- [x] 3.2 Manual smoke-test of each filter, combined filters, empty results, and invalid values
