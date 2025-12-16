type Glove = { hand: 'L' | 'R'; color: string }
type HandCount = { L: number; R: number }

function matchGloves(gloves: Glove[]): string[] {
  const map: Record<string, HandCount> = {}

  for (const { hand, color } of gloves) {
    map[color] ??= { L: 0, R: 0 }
    map[color][hand]++
  }

  const data: [string, HandCount][] = Object.entries(map)

  return data.reduce<string[]>((acc, [color, { L, R }]) => {
    for (let i = 0; i < Math.min(L, R); i++) acc.push(color)

    return acc
  }, [])
}
