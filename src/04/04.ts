function decodeSantaPin(code: string): string | null {
  const blocks = code.match(/\[[^\]]+\]/g);
  const digits: number[] = [];
  const PIN_LENGTH = 4;

  if (!blocks) return null;

  for (const b of blocks) {
    if (b === '[<]') {
      if (digits.length === 0) return null;
      digits.push(digits[digits.length - 1]);
    } else {
      let number = Number(b[1]);

      // Operaciones
      // (number + 9) % 10 es equivalente a hacer n - 1
      const ops = b.slice(2, -1).split('');

      ops.forEach(
        (op) => (number = (op === '+' ? number + 1 : number + 9) % 10),
      );

      digits.push(number);
    }
  }

  return digits.length === PIN_LENGTH ? digits.join('') : null;
}
