function drawGift(size: number, symbol: string): string {
  if (size < 2) return "";

  const inner = size - 2;
  const border = symbol.repeat(size);

  if (inner === 0) return `${border}\n${border}`;

  const middle = `${symbol}${" ".repeat(inner)}${symbol}`;

  return [border, ...Array(inner).fill(middle), border].join("\n");
}