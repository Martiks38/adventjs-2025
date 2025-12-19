export function revealSantaRoute(routes: string[][]): string[] {
  if (routes.length === 0) return [];

  const map = new Map(routes.map(([from, to]) => [from, to]));
  const result = routes[0];

  let current = result[1];

  while (map.has(current)) {
    const next = map.get(current);

    if (!next) return result;

    result.push(next);
    current = next;
  }

  return result;
}
