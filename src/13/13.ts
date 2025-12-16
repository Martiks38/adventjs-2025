type Factory = string[]
type Result = 'completed' | 'broken' | 'loop'
type Position = {R: number, C: number}      

function runFactory(factory: Factory): Result {
  const DELTA = {
    "^": { row: -1, col: 0 },
    "v": { row: 1, col: 0 },
    "<": { row: 0, col: -1 },
    ">": { row: 0, col: 1 }
  }

  const META = "."
  const STATUS = {
    COMPLETED: "completed",
    LOOP: "loop",
    BROKEN: "broken"
  } as const

  const MAX_ROWS = factory.length
  const MAX_COLS = factory[0].length
  const visitedCell = new Set<string>()

  if (MAX_ROWS === 0 || MAX_COLS === 0) return STATUS.BROKEN

  let currentPosition = { R: 0, C: 0 }

  while (true) {
    const move = factory[currentPosition.R][currentPosition.C]

    if (move === META) return STATUS.COMPLETED

    const key = `${currentPosition.R},${currentPosition.C}`
    if (visitedCell.has(key)) return STATUS.LOOP
    visitedCell.add(key)

    const delta = DELTA[move]
    if (!delta) return STATUS.BROKEN

    const nextPosition = {
      R: currentPosition.R + delta.row,
      C: currentPosition.C + delta.col
    }

    const offBoard =
      nextPosition.R < 0 ||
      nextPosition.R >= MAX_ROWS ||
      nextPosition.C < 0 ||
      nextPosition.C >= MAX_COLS

    if (offBoard) return STATUS.BROKEN

    currentPosition = nextPosition
  }
}