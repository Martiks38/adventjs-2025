export function hasFourInARow(board: string[][]): boolean {
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

      if (count >= TARGET_LIGHTS_ON) return true;
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

  for (let r = 0; r <= rows - TARGET_LIGHTS_ON; r++) {
    for (let c = 0; c <= cols - TARGET_LIGHTS_ON; c++) {
      const diag: string[] = [];

      for (let i = 0; i < TARGET_LIGHTS_ON; i++) {
        diag.push(board[r + i][c + i]);
      }

      if (checkPanel(diag)) return true;
    }
  }

  for (let r = 0; r <= rows - TARGET_LIGHTS_ON; r++) {
    for (let c = TARGET_LIGHTS_ON - 1; c < cols; c++) {
      const diag: string[] = [];

      for (let i = 0; i < TARGET_LIGHTS_ON; i++) {
        diag.push(board[r + i][c - i]);
      }

      if (checkPanel(diag)) return true;
    }
  }

  return false;
}
