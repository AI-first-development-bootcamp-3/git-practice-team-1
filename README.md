# Todo Workshop

A simple Todo app for the Git workshop.

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Run both server and client
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001

## Tech Stack

- **Client**: React 18 + Vite
- **Server**: Node.js + Fastify
- **Storage**: JSON file (no database required)
- **Styling**: Plain CSS

## Project Structure

```
todo-workshop/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx
│   │   │   ├── Statistics.jsx
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── AddTodo.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── todos.js
│   │   ├── services/
│   │   │   └── todoService.js
│   │   ├── data/
│   │   │   └── todos.json
│   │   └── server.js
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| GET | /api/todos/statistics | Get server-calculated todo statistics |
| GET | /api/todos/:id | Get single todo |
| POST | /api/todos | Create todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

## Todo Object

```json
{
  "id": "uuid",
  "title": "Task title",
  "status": "todo | in-progress | review | done",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

## Statistics Response

`GET /api/todos/statistics` performs all aggregation on the server and returns:

```json
{
  "totalTasks": 0,
  "completionPercentage": 0.0,
  "tasksByStatus": {
    "todo": 0,
    "in-progress": 0,
    "review": 0,
    "done": 0
  }
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both client and server |
| `npm run client` | Run client only |
| `npm run server` | Run server only |
| `npm run install:all` | Install all dependencies |
