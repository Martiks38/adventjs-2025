function drawTree(height: number, ornament: string, frequency: number): string {
  let res = '';

  for (let numberRow = 1; numberRow <= height; numberRow++) {
    const spaces = ' '.repeat(height - numberRow);
    let row = '';
    const len = 2 * numberRow - 1;
    const position = (numberRow - 1) * (numberRow - 1) + 1;

    for (let j = 0; j < len; j++) {
      row += (position + j) % frequency === 0 ? ornament : '*';
    }
    res += spaces + row + '\n';
  }

  return res + `${' '.repeat(height - 1)}#`;
}
