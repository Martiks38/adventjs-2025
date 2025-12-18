import { describe, expect, expectTypeOf, it } from 'vitest';
import { manufactureGifts } from './02.ts';

const productionMocks = {
  normal: () => [
    { toy: 'car', quantity: 3 },
    { toy: 'doll', quantity: 1 },
    { toy: 'ball', quantity: 2 },
  ],
  empty: () => [],
  negative: () => [{ toy: 'robot', quantity: -1 }],
  invalid: () => [{ toy: 'ball', quantity: null }],
};

describe('Challenge 02', () => {
  it.each([
    { input: productionMocks.normal() },
    { input: productionMocks.empty() },
    { input: productionMocks.negative() },
    { input: productionMocks.invalid() },
  ])('returns string[]', ({ input }) => {
    expectTypeOf(manufactureGifts(input)).toEqualTypeOf<string[]>();
  });

  it('repeat each toy according to its quantity', () => {
    const production = [
      { toy: 'car', quantity: 3 },
      { toy: 'doll', quantity: 1 },
      { toy: 'ball', quantity: 2 },
    ];

    const result = manufactureGifts(production);

    expect(result).toEqual(['car', 'car', 'car', 'doll', 'ball', 'ball']);
  });

  it('ignores non-positive quantities', () => {
    expect(manufactureGifts(productionMocks.negative())).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    expect(manufactureGifts([])).toEqual([]);
  });

  it('ignores items with non-numeric quantity', () => {
    const result = manufactureGifts(productionMocks.invalid());

    expect(result).toEqual([]);
  });
});
