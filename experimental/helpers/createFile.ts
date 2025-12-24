import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';
import pc from 'picocolors';

const suffixs = ['.ts', '.test.ts', '.md'] as const;

type ContentContext = {
  numberChallenge: string | number;
  nameChallenge: string;
  difficult: string;
  functionName: string;
  funcStatement: string;
};

type MarkdownContext = Omit<ContentContext, 'functionName' | 'funcStatement'>;
type TestContext = Pick<ContentContext, 'functionName' | 'numberChallenge'>;
type SolutionRenderContext = Pick<ContentContext, 'funcStatement'>;

type GeneratorContextMap = {
  '.md': MarkdownContext;
  '.test.ts': TestContext;
  '.ts': SolutionRenderContext;
};

type ContentGenerators = {
  [K in keyof GeneratorContextMap]: (ctx: GeneratorContextMap[K]) => string;
};

const solutionFileGenerator = (ctx: SolutionRenderContext) =>
  `export ${ctx.funcStatement}`;

const testGenerator = ({
  functionName,
  numberChallenge,
}: TestContext): string => {
  return `import { describe, expect, it } from 'vitest';\nimport { ${functionName} } from './${numberChallenge}.ts';\n\ndescribe('Challenge ${numberChallenge} - ${functionName}', () => { });\n`;
};

const markdownGenerator = ({
  difficult,
  nameChallenge,
  numberChallenge,
}: MarkdownContext): string => {
  return `# RETO ${numberChallenge}: ${nameChallenge}\n\n<ins>Dificultad: ${difficult}</ins>\n\n🧩 Ejemplos\n\n~~~JS\n\n~~~\n`;
};

const contentGenerators: ContentGenerators = {
  '.md': (ctx: MarkdownContext) => markdownGenerator(ctx),
  '.ts': (ctx: SolutionRenderContext) => solutionFileGenerator(ctx),
  '.test.ts': (ctx: TestContext) => testGenerator(ctx),
};

function generateContent<K extends keyof ContentGenerators>(
  suffix: K,
  ctx: GeneratorContextMap[K],
): string {
  return contentGenerators[suffix](ctx);
}

export async function createFiles(answers: string[]) {
  const [
    numberChallenge,
    nameChallenge,
    difficult,
    functionName,
    funcStatement,
  ] = answers;

  const markdownCtx: MarkdownContext = {
    numberChallenge,
    nameChallenge,
    difficult,
  };

  const solutionCtx: SolutionRenderContext = { funcStatement };

  const testCtx: TestContext = {
    functionName,
    numberChallenge,
  };

  const contexts: GeneratorContextMap = {
    '.md': markdownCtx,
    '.test.ts': testCtx,
    '.ts': solutionCtx,
  };

  const __filename = fileURLToPath(import.meta.url);
  const parts = __filename.split(path.sep);
  const index = parts.lastIndexOf('Adventjs');
  const projectRoot = parts.slice(0, index + 1).join(path.sep);

  const dirPath = path.join(projectRoot, 'src', numberChallenge);

  try {
    await mkdir(dirPath, { recursive: true });

    for (const suffix of suffixs) {
      const filePath = path.join(dirPath, numberChallenge + suffix);
      const content = generateContent(suffix, contexts[suffix]);

      await writeFile(filePath, content, 'utf-8');
    }

    console.log('Archivo creado correctamente.');
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);

    throw new Error(pc.bold(`El reto ${numberChallenge} ya existe`));
  }
}
