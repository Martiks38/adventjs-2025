export function clearGifts(warehouse: string[][], drops: number[]): string[][] {
  const warehouseCpy: string[][] = warehouse.map((row) => [...row]);

  if (warehouse.length === 0) return warehouseCpy;

  const rows = warehouse.length;
  const columns = warehouse[0].length;
  const ELEMENTS = {
    EMPTY: '.',
    GIFT: '#',
  };

  const isRowComplete = (row: string[]): boolean =>
    row.every((cell) => cell === ELEMENTS.GIFT);

  const clearCompletedRows = () => {
    for (let r = rows - 1; r >= 0; r--) {
      if (isRowComplete(warehouseCpy[r])) {
        warehouseCpy.splice(r, 1);
        warehouseCpy.unshift(Array(columns).fill(ELEMENTS.EMPTY));
        r++;
      }
    }
  };

  for (const drop of drops) {
    if (drop < 0 || drop >= columns) continue;

    for (let r = rows - 1; r >= 0; r--) {
      if (warehouseCpy[r][drop] === ELEMENTS.EMPTY) {
        warehouseCpy[r][drop] = ELEMENTS.GIFT;
        clearCompletedRows();
        break;
      }
    }
  }

  return warehouseCpy;
}
