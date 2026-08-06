import { getStatuses } from '../constants/statuses.js';

export default async function statusesRoutes(fastify) {
  // GET /api/statuses - List allowed todo statuses
  fastify.get('/', async () => {
    return getStatuses();
  });
}
