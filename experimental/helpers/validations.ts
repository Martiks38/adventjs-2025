import type { Question } from './askText.ts';

type Validation =
  | { valid: true; data: string }
  | { valid: false; error: string };

type Fn<Input, Output> = (input: Input) => Output;

type Validations = Record<Question['responseType'], Fn<string, Validation>>;

type DifficultyKey = 'easy' | 'medium' | 'hard';

const difficulties: Record<DifficultyKey, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
};

const validateTypeNumber = (input: string): Validation => {
  const value = Number(input);
  const valid = !isNaN(value) && value > 0;

  return valid
    ? { valid, data: input }
    : { valid, error: 'Formato inválido. Use un número mayor a 0' };
};

const validateTypeString = (input: string): Validation => {
  const valid = input.length !== 0;

  return valid
    ? { valid, data: input }
    : { valid, error: 'El campo no puede estar vacío' };
};

const validateDifficult = (input: string): Validation => {
  const key = input.trim().toLowerCase() as DifficultyKey;

  if (!(key in difficulties)) {
    return {
      valid: false,
      error: 'El campo no puede estar vacío o no es una dificultad válida',
    };
  }
  return { valid: true, data: difficulties[key] };
};

export const validations: Validations = {
  string: (input: string) => validateTypeString(input),
  number: (input: string) => validateTypeNumber(input),
  difficult: (input: string) => validateDifficult(input),
};
