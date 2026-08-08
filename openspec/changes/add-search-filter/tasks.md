## 1. OpenSpec
- [x] 1.1 Write proposal, tasks, and spec deltas
- [x] 1.2 Validate with `openspec validate add-search-filter --strict`

## 2. Server
- [ ] 2.1 Accept optional `filters` argument in `todoService.getAll`
- [ ] 2.2 Match `search` as a case-insensitive substring of title
- [ ] 2.3 Match `status` and `priority` against their allowed value lists (OR within, AND across)
- [ ] 2.4 Parse and validate query parameters in the `GET /api/todos` route
- [ ] 2.5 Return 400 for unrecognized status or priority values
- [ ] 2.6 Leave the statistics endpoints unfiltered

## 3. Docs & verify
- [ ] 3.1 Document the query parameters in the README API table
- [ ] 3.2 Manual smoke-test of each filter, combined filters, empty results, and invalid values
