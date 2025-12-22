export function canEscape(maze: string[][]): boolean {
  const ELEMENTS = {
    START: 'S',
    EXIT: 'E',
    WALL: '#',
  };
  const rows = maze.length;
  const cols = maze[0].length;
  let startRow = -1;
  let startCol = -1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === ELEMENTS.START) {
        startRow = r;
        startCol = c;
        break;
      }
    }
  }

  const queue: [number, number][] = [[startRow, startCol]];
  const visited = new Set<string>();
  visited.add(`${startRow},${startCol}`);

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    if (maze[row][col] === ELEMENTS.EXIT) return true;

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const key = `${newRow},${newCol}`;

      const isOutsideMaze =
        newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols;

      const isWallPosition =
        isOutsideMaze && maze[newRow][newCol] !== ELEMENTS.WALL;

      if (isOutsideMaze && isWallPosition && !visited.has(key)) {
        visited.add(key);
        queue.push([newRow, newCol]);
      }
    }
  }

  return false;
}
