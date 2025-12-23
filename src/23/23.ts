type ExploreCtx = {
  map: string[][];
  distances: number[][];
};

export function minStepsToDeliver(map: string[][]): number {
  const ELEMENTS = {
    START: 'S',
    HOUSE: 'G',
    WALL: '#',
  };
  const rows = map.length;
  const cols = map[0].length;
  let startRow = -1;
  let startCol = -1;

  const distances: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity),
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (map[r][c] === 'S') {
        startRow = r;
        startCol = c;
      }
    }
  }

  const queue: [number, number][] = [[startRow, startCol]];

  distances[startRow][startCol] = 0;

  const isValidMove = (
    map: string[][],
    distances: number[][],
    r: number,
    c: number,
  ): boolean => {
    const isInside = r >= 0 && r < rows && c >= 0 && c < cols;

    return isInside && map[r][c] !== '#' && distances[r][c] === Infinity;
  };

  const exploreNeighbors = (
    { map, distances }: ExploreCtx,
    row: number,
    col: number,
  ): [number, number][] => {
    const DIRECTIONS = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const neighbors: [number, number][] = [];

    for (const [dr, dc] of DIRECTIONS) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (isValidMove(map, distances, newRow, newCol)) {
        distances[newRow][newCol] = distances[row][col] + 1;
        neighbors.push([newRow, newCol]);
      }
    }

    return neighbors;
  };

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    const neighbors = exploreNeighbors({ map, distances }, row, col);
    neighbors.forEach((q) => queue.push(q));
  }

  let totalSteps = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (map[r][c] !== ELEMENTS.HOUSE) continue;

      if (distances[r][c] === Infinity) return -1;

      totalSteps += distances[r][c];
    }
  }

  return totalSteps;
}

const map = [
  ['S', '.', 'G'],
  ['.', '#', '.'],
  ['G', '.', '.'],
];

console.log(minStepsToDeliver(map));
