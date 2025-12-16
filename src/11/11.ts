function findUnsafeGifts(warehouse: string[]): number {
  const ELEMENTS = {
    Empty: '.',
    Camera: '#',
    Gift: '*'
  }
  const DIRS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]
  const rows = warehouse.length
  let secureGifts = 0

  const isCameraAt = (
    nr: number,
    nc: number,
    rows: number,
    cols: number
  ): boolean => {
    const insideWarehouse = nr >= 0 && nr < rows && nc >= 0 && nc < cols
    return insideWarehouse && warehouse[nr][nc] === ELEMENTS.Camera
  }

  for (let r = 0; r < rows; r++) {
    const cols = warehouse[r].length

    for (let c = 0; c < cols; c++) {
      if (warehouse[r][c] !== ELEMENTS.Gift) continue

      const watched = DIRS.some(([dr, dc]) =>
        isCameraAt(r + dr, c + dc, rows, cols)
      )

      if (!watched) secureGifts++
    }
  }

  return secureGifts
}
