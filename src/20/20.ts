export function dropGifts(warehouse: string[][], drops: number[]): string[][] {
  const warehouseCpy: string[][] = warehouse.map((row) => [...row]);

  if (warehouse.length === 0) return warehouseCpy;

  const rows = warehouse.length;
  const columns = warehouse[0].length;
  const ELEMENTS = {
    EMPTY: '.',
    GIFT: '#',
  };

  for (const drop of drops) {
    if (drop < 0 || drop >= columns) continue;

    for (let r = rows - 1; r >= 0; r--) {
      if (warehouseCpy[r][drop] === ELEMENTS.EMPTY) {
        warehouseCpy[r][drop] = ELEMENTS.GIFT;
        break;
      }
    }
  }

  return warehouseCpy;
}
