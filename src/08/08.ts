type Info = {count: number; character: string}

function findUniqueToy(toy: string): string {
  const map = new Map<string, Info>()

  for(const character of toy)
  {
    const key = character.toLowerCase()
    const info = map.get(key)

    if(!info)
    {
      map.set(key, {count: 1, character})
    }
    else
    {
      info.count++
    }
  }

  const elem = [...map.values()].find((letter) => letter.count === 1)

  return !elem ? "" : elem.character
}