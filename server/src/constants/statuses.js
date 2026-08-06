export const VALID_STATUSES = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

const STATUS_IDS = new Set(VALID_STATUSES.map((status) => status.id));

export function isValidStatus(status) {
  return typeof status === 'string' && STATUS_IDS.has(status);
}

export function getStatuses() {
  return VALID_STATUSES;
}
