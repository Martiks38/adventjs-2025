import pc from 'picocolors';
import { validations } from './validations.ts';
import { ReadlineSingleton } from './readline-singleton.ts';
import { showError } from '../views/showError.ts';
import { clearConsoleLine, clearError } from './clearConsole.ts';

export type Question = {
  question: string;
  responseType: 'string' | 'number' | 'difficult';
};

const rl = ReadlineSingleton.instance;

const questions: Question[] = [
  {
    question: '› Número del reto: ',
    responseType: 'number',
  },
  {
    question: '› Nombre del reto: ',
    responseType: 'string',
  },
  {
    question:
      '› Dificultad del reto ' +
      pc.bgGreen('Easy') +
      ' ' +
      pc.bgYellow('Medium') +
      ' ' +
      pc.bgRed('Hard') +
      ': ',
    responseType: 'difficult',
  },
  {
    question: '› Nombre de la función: ',
    responseType: 'string',
  },
  {
    question: '› Exprese la función en una sola línea: ',
    responseType: 'string',
  },
];

const formatQuestion = (q: string): string => {
  return pc.bold(pc.yellow(q[0]) + pc.white(q.slice(1)));
};

const confirmResponses = async (): Promise<boolean> => {
  let lineStr: string = '';
  let hasError = false;

  console.log('');

  do {
    if (hasError) clearConsoleLine();

    const line = await rl.question(pc.dim(`¿Confirmar? [${pc.bold('Y')}/n] `));
    lineStr = line.toString().trim().toLowerCase();

    hasError = lineStr !== 'y' && lineStr !== 'n' && lineStr !== '';
  } while (hasError);

  return lineStr !== 'n';
};

export async function inputCollector() {
  let answers: string[];

  try {
    while (true) {
      answers = [];

      for (const { question, responseType } of questions) {
        let errorVisible = false;

        while (true) {
          const line = await rl.question(formatQuestion(question));
          const lineStr = line.toString().trim();
          const validation = validations[responseType](lineStr);

          if (validation.valid) {
            answers.push(validation.data);

            if (errorVisible) clearError();

            break;
          }

          showError(validation.error, errorVisible);
          errorVisible = true;
        }
      }

      if (await confirmResponses()) {
        console.log(pc.bgGreen('Confirmed'));
        break;
      }

      clearConsoleLine(4);
    }
  } finally {
    ReadlineSingleton.close();
  }

  console.log('');
  return answers;
}
