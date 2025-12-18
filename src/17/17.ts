export function hasFourLights(board: string[][]): boolean {
  const LIGHT_ON = new Set(['R', 'G']);
  const rows = board.length;
  const cols = board[0].length;

  const TARGET_LIGHTS_ON = 4;

  const checkPanel = (cells: string[]): boolean => {
    let count = 0;
    let last = '';

    for (const cell of cells) {
      if (LIGHT_ON.has(cell) && cell === last) {
        count++;
      } else {
        count = LIGHT_ON.has(cell) ? 1 : 0;
      }

      last = cell;

      if (count === TARGET_LIGHTS_ON) return true;
    }

    return false;
  };

  for (let r = 0; r < rows; r++) {
    const row = board[r];

    if (checkPanel(row)) return true;
  }

  for (let c = 0; c < cols; c++) {
    const col: string[] = [];

    for (let r = 0; r < rows; r++) {
      col.push(board[r][c]);
    }

    if (checkPanel(col)) return true;
  }

  return false;
}
