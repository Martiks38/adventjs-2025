type Board = string;
type Moves = string;
type Result = 'fail' | 'crash' | 'success';
type Position = {
  col: number;
  row: number;
};

function moveReno(board: Board, moves: Moves): Result {
  enum Elements {
    Obstaculo = '#',
    Suelo = '.',
    Objeto = '*',
    Reno = '@',
  }
  enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R',
  }

  const grid = board
    .split('\n')
    .slice(1, -1)
    .map((line) => line.split(''));

  const MAX_ROW = grid.length;
  const posReno: Position = { col: -1, row: -1 };

  for (let r = 0; r < MAX_ROW; r++) {
    const c = grid[r].indexOf(Elements.Reno);
    if (c !== -1) {
      posReno.row = r;
      posReno.col = c;
      break;
    }
  }

  if (posReno.row === -1) return 'fail';

  const DELTA = {
    [Direction.Up]: { row: -1, col: 0 },
    [Direction.Down]: { row: 1, col: 0 },
    [Direction.Left]: { row: 0, col: -1 },
    [Direction.Right]: { row: 0, col: 1 },
  };

  let current: Position = { ...posReno };
  for (const move of moves) {
    const next: Position = {
      row: current.row + DELTA[move].row,
      col: current.col + DELTA[move].col,
    };

    const offBoardRow = next.row < 0 || next.row >= MAX_ROW;
    const offBoardCol =
      !offBoardRow && (next.col < 0 || next.col >= grid[next.row].length);

    if (offBoardRow || offBoardCol) return 'crash';

    const cell = grid[next.row][next.col];
    if (cell === Elements.Obstaculo) return 'crash';
    if (cell === Elements.Objeto) return 'success';

    current = next;
  }

  return 'fail';
}
