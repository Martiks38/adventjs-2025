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

  const save = (
    map: Map<number, number>,
    initialIndex: number,
    endIndex: number,
  ) => {
    map.set(initialIndex, endIndex);
    map.set(endIndex, initialIndex);
  };

  for (let p = 0; p < totalInstructions; p++) {
    const char = code[p];

    if (char === TOKENS.LOOP_INIT || char === TOKENS.CONDITIONAL_INIT) {
      stack.push({ char, pos: p });
      continue;
    }

    if (char === TOKENS.LOOP_END || char === TOKENS.CONDITIONAL_END) {
      const last = stack.pop()!;

      const map = last.char === TOKENS.CONDITIONAL_INIT ? conditionals : loops;

      save(map, last.pos, p);
    }
  }

  const incrementHandler = (state: ExecutionState): void => {
    state.value++;
    state.index++;
  };

  const decrementHandler = (state: ExecutionState): void => {
    state.value--;
    state.index++;
  };

  const handleLoop = (state: ExecutionState, token: Token): void => {
    const keepGoing = token === '[' ? state.value !== 0 : state.value === 0;

    state.index = keepGoing ? state.index + 1 : loops.get(state.index)! + 1;
  };

  const initialConditionalHandler = (state: ExecutionState): void => {
    if (state.value !== 0) {
      state.index++;
      return;
    }
    const jumpTo = conditionals.get(state.index)!;

    state.index = jumpTo + 1;
  };

  const handlers: Record<Token, (state: ExecutionState) => void> = {
    '>': (state) => {
      state.index++;
    },
    '+': (state) => incrementHandler(state),
    '-': (state) => decrementHandler(state),
    '[': (state) => handleLoop(state, '['),
    ']': (state) => handleLoop(state, ']'),
    '{': (state) => initialConditionalHandler(state),
    '}': (state) => {
      state.index++;
    },
  };

  while (state.index < totalInstructions) {
    const instruction = code[state.index] as Token;

    handlers[instruction](state);
  }

  return state.value;
}

console.log(execute('>>>+{++}'));
