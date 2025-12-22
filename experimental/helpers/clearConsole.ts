import { clearLine, moveCursor } from 'node:readline';
import { stdout } from 'node:process';

export function clearConsoleLine(move: number = 1) {
  moveCursor(stdout, 0, -1 * move);
  clearLine(stdout, 0);
}

export function clearError() {
  clearConsoleLine(2);
  moveCursor(stdout, 0, 2);
}
