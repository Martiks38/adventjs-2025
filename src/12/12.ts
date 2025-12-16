function elfBattle(elf1: string, elf2: string): number {
  const MOVEMENTS = {
    NORMAL: 'A',
    STRONG: 'F',
    BLOCK: 'B',
    TIRED: '',
  } as const;

  const DAMAGE_TABLE: Record<Movement, Record<Movement, number>> = {
    [MOVEMENTS.TIRED]: { A: 0, F: 0, B: 0, '': 0 },
    [MOVEMENTS.NORMAL]: { A: 1, F: 1, B: 0, '': 1 },
    [MOVEMENTS.STRONG]: { A: 2, F: 2, B: 2, '': 2 },
    [MOVEMENTS.BLOCK]: { A: 0, F: 0, B: 0, '': 0 },
  };

  type Movement = (typeof MOVEMENTS)[keyof typeof MOVEMENTS];

  let hp1 = 3;
  let hp2 = 3;

  const getMovement = (mov: string | undefined): Movement =>
    (mov as Movement) ?? MOVEMENTS.TIRED;

  const calculateDamage = (
    movement: Movement,
    movementOpponent: Movement,
  ): number => DAMAGE_TABLE[movement][movementOpponent];

  const rounds = Math.max(elf1.length, elf2.length);

  for (let round = 0; round < rounds; round++) {
    const mov1 = getMovement(elf1[round]);
    const mov2 = getMovement(elf2[round]);

    hp2 -= calculateDamage(mov1, mov2);
    hp1 -= calculateDamage(mov2, mov1);

    if (hp1 <= 0 || hp2 <= 0) break;
  }

  if (hp1 === hp2) return 0;
  return hp1 > hp2 ? 1 : 2;
}
