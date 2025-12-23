import { describe, expect, expectTypeOf, it } from 'vitest';
import { minStepsToDeliver } from './23.ts';

describe('Challenge 23 - minStepsToDeliver', () => {
  it('sums the minimum distances to multiple houses', () => {
    const map = [
      ['S', '.', 'G'],
      ['.', '#', '.'],
      ['G', '.', '.'],
    ];

    expectTypeOf(minStepsToDeliver(map)).toBeNumber();
  });

  it('sums the minimum distances to multiple houses', () => {
    const map = [
      ['S', '.', 'G'],
      ['.', '#', '.'],
      ['G', '.', '.'],
    ];

    expect(minStepsToDeliver(map)).toBe(4);
  });

  it('returns -1 if any house is unreachable', () => {
    const map = [
      ['S', '#', 'G'],
      ['#', '#', '.'],
      ['G', '.', '.'],
    ];

    expect(minStepsToDeliver(map)).toBe(-1);
  });

  it('works with a single-row map', () => {
    const map = [['S', 'G']];

    expect(minStepsToDeliver(map)).toBe(1);
  });

  it('returns 0 when there are no houses with gifts', () => {
    const map = [
      ['S', '.'],
      ['.', '.'],
    ];

    expect(minStepsToDeliver(map)).toBe(0);
  });

  it('correctly calculates the distance to an adjacent house', () => {
    const map = [['S', 'G']];

    expect(minStepsToDeliver(map)).toBe(1);
  });

  it('correctly sums long minimum distances', () => {
    const map = [
      ['S', '.', '.', '.', 'G'],
      ['#', '#', '#', '.', '#'],
      ['G', '.', '.', '.', '.'],
    ];

    // S → (0,4) = 4 steps
    // S → (2,0) = 8 steps
    // Total = 12
    expect(minStepsToDeliver(map)).toBe(12);
  });

  it('returns -1 if a house is completely blocked by obstacles', () => {
    const map = [
      ['S', '.', '.'],
      ['.', '#', '#'],
      ['.', '#', 'G'],
    ];

    expect(minStepsToDeliver(map)).toBe(-1);
  });

  it('does not depend on the delivery order of the houses', () => {
    const map = [
      ['.', 'G', '.'],
      ['.', 'S', '.'],
      ['.', 'G', '.'],
    ];

    // Distances:
    // S → (0,1) = 1
    // S → (2,1) = 1
    // Total = 2
    expect(minStepsToDeliver(map)).toBe(2);
  });
});
