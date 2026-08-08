# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## Commands

```bash
# First-time setup
npm run install:all

# Run both client and server concurrently
npm run dev

# Run individually
npm run client   # Vite dev server → http://localhost:5173
npm run server   # Fastify server  → http://localhost:3001

# Client build
cd client && npm run build
```

There are no tests in this project.

## Architecture

This is a monorepo with a React SPA frontend and a Node.js/Fastify REST backend. Both are ESM (`"type": "module"`).

**Request flow:** `client/src/services/api.js` → `server/src/routes/todos.js` → `server/src/services/todoService.js` → `server/src/data/todos.json`

**State management:** `App.jsx` owns all todo state. It fetches on mount and updates state optimistically after each mutation. `TodoList` and `TodoItem` receive state and callbacks as props — no shared state library.

**Persistence:** Todos are stored in `server/src/data/todos.json` (a flat JSON array). `todoService.js` reads and rewrites this file on every operation (no database). The file is created empty on first read error.

**Todo schema:**
```json
{
  "id": "uuid",
  "title": "string",
  "status": "todo | done",
  "priority": "low | medium | high",
  "dueDate": "YYYY-MM-DD | null",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

Priority defaults to `"medium"` when omitted. `VALID_PRIORITIES` is exported from `todoService.js` and is the single source of truth for allowed values. Validation throws `ValidationError` (also exported) which routes catch and convert to HTTP 400.

**CORS:** Server allows only `http://localhost:5173`. Change `server/src/server.js` if the client port changes.
