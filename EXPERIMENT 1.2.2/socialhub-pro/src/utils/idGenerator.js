let counter = 0;

/**
 * Generates a short, sortable, collision-resistant id without pulling in
 * an external uuid dependency. Good enough for client-generated entities
 * before a real backend assigns a permanent id.
 */
export function generateId(prefix = 'id') {
  counter += 1;
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${time}${rand}${counter}`;
}
