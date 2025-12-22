import pc from 'picocolors';
import { clearConsoleLine } from '../helpers/clearConsole.ts';

export function showError(msg: string, errorVisible?: boolean) {
  const loops = errorVisible ? 2 : 1;

  for (let i = 0; i < loops; i++) clearConsoleLine();

  console.log(`${pc.bgRed('Error')}: ${msg}`);
}
