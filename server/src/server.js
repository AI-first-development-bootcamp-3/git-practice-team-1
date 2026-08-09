import Fastify from 'fastify';
import cors from '@fastify/cors';
import todosRoutes from './routes/todos.js';
import statusesRoutes from './routes/statuses.js';

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  // Vite may be opened as localhost or 127.0.0.1; browsers treat them as different origins.
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
});

await fastify.register(statusesRoutes, { prefix: '/api/statuses' });
await fastify.register(todosRoutes, { prefix: '/api/todos' });

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log('Server running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
