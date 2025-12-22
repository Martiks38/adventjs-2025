import { showTitle } from './views/showTitle.ts';
import { ReadlineSingleton } from './helpers/readline-singleton.ts';
import { inputCollector } from './helpers/askText.ts';
import { createFiles } from './helpers/createFile.ts';
import pc from 'picocolors';

async function main() {
  showTitle();

  try {
    const answers = await inputCollector();
    await createFiles(answers);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.log(`${pc.bgRed('Error')}: ${pc.bold(msg)}`);

    process.exit(1);
  } finally {
    ReadlineSingleton.close();
  }

  process.exit(0);
}

main();
