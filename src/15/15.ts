type Data = Array<Record<string, string | number>>
type SortBy = string

function drawTable(data: Data, sortBy: SortBy): string {
  if(data.length === 0) return ""

  const PADDING = 1
  const keys = Object.keys(data[0])
  const heading = Array.from({ length: keys.length}, (_, i) => String.fromCharCode(65 + i))

  const calculateColumnLengths = (data: Data, keys: string[]) => {
    const maxLengths = Array(keys.length).fill(0)

    for (const row of data) {
      for (const index in keys) {
        const key = keys[index]
        const length = String(row[key]).length
        if (length > maxLengths[index]) {
          maxLengths[index] = length
        }
      }
    }

    return maxLengths
  }
  
  const lengths = calculateColumnLengths(data, keys)

  const separator = "+" + lengths.map( l => "-".repeat(l + 2 * PADDING)).join("+") + "+"

  const compareValues = (a: string | number, b: string | number): number => 
    String(a).localeCompare(String(b), undefined, { numeric: true })

  const sortedData = [...data].sort((a, b) => compareValues(a[sortBy], b[sortBy]))
  
  const generateRow = (cols: (string | number)[], lengths: number[]): string => {
    return "|" + lengths.map((len, i) => " ".repeat(PADDING) + cols[i].toString().padEnd(len + PADDING, " ")).join("|") + "|"
  }
  
  const headingRow = generateRow(heading, lengths)
  const mainContain = sortedData.map(data => generateRow(Object.values(data), lengths)).join("\n")

  return `${separator}
${headingRow}
${separator}
${mainContain}
${separator}`
}
