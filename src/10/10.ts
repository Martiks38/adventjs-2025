function maxDepth(s: string): number {
  let cant = 0;
  let depth = 0;

  const ELEMENTS = {
    LEFT: '[',
    RIGHT: ']',
  };

  for (const c of s) {
    c === ELEMENTS.LEFT ? cant++ : cant--;

    if (cant < 0) return -1;
    if (cant > depth) depth++;
  }

  return cant === 0 ? depth : -1;
}
