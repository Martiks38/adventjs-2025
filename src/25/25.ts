type Token = '>' | '+' | '-' | '[' | ']' | '{' | '}';
type ExecutionState = {
  value: number;
  index: number;
};

export function execute(code: string): number {
  const TOKENS = {
    JUMP: '>',
    INCREMENT: '+',
    DECREMENT: '-',
    LOOP_INIT: '[',
    LOOP_END: ']',
    CONDITIONAL_INIT: '{',
    CONDITIONAL_END: '}',
  } as const;

  const totalInstructions = code.length;
  const state: ExecutionState = {
    value: 0,
    index: 0,
  };

  const stack: { char: string; pos: number }[] = [];
  const loops = new Map<number, number>();
  const conditionals = new Map<number, number>();

  for (let p = 0; p < totalInstructions; p++) {
    const char = code[p];

    if (char === TOKENS.LOOP_INIT || char === TOKENS.CONDITIONAL_INIT) {
      stack.push({ char, pos: p });
      continue;
    }

    if (char === TOKENS.LOOP_END || char === TOKENS.CONDITIONAL_END) {
      const last = stack.pop()!;

      if (last.char === TOKENS.CONDITIONAL_INIT) {
        conditionals.set(last.pos, p);
      } else {
        loops.set(last.pos, p);
        loops.set(p, last.pos);
      }
    }
  }

  const jump = (state: ExecutionState, token: Token): void => {
    const isLoop = token === '[' || token === ']';
    const isStart = token === '[' || token === '{';

    const map = isLoop ? loops : conditionals;

    let shouldStay: boolean;

    if (isLoop) {
      shouldStay = isStart ? state.value !== 0 : state.value === 0;
    } else {
      shouldStay = isStart ? state.value !== 0 : true;
    }

    state.index = shouldStay ? state.index + 1 : map.get(state.index)! + 1;
  };

  const handlers: Record<Token, (s: ExecutionState) => void> = {
    '>': (s) => {
      s.index++;
    },
    '+': (s) => {
      s.value++;
      s.index++;
    },
    '-': (s) => {
      s.value--;
      s.index++;
    },
    '[': (s) => jump(s, '['),
    ']': (s) => jump(s, ']'),
    '{': (s) => jump(s, '{'),
    '}': (s) => s.index++,
  };

  while (state.index < totalInstructions) {
    const instruction = code[state.index] as Token;
    const fn = handlers[instruction];

    fn(state);
  }

  return state.value;
}
