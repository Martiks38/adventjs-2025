import { describe, expect, expectTypeOf, it } from 'vitest';
import { canEscape } from './22.ts';

describe('Challenge 22 - canEscape', () => {
  it('should return an boolean', () => {
    const maze = [['S', 'E']];

    const result = canEscape(maze);

    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  it('returns true when a path exists from start to exit', () => {
    const maze = [
      ['S', '.', '#', '.'],
      ['#', '.', '#', '.'],
      ['.', '.', '.', '.'],
      ['#', '#', '#', 'E'],
    ];

    expect(canEscape(maze)).toBeTruthy();
  });

  it('returns false when the exit is completely blocked', () => {
    const maze = [
      ['S', '#', '#'],
      ['.', '#', '.'],
      ['.', '#', 'E'],
    ];

    expect(canEscape(maze)).toBeFalsy();
  });

  it('returns true when start and exit are adjacent', () => {
    expect(canEscape([['S', 'E']])).toBeTruthy();
  });

  it('returns false when the exit is blocked by a wall', () => {
    expect(canEscape([['S', '#', 'E']])).toBeFalsy();
  });

  it('returns true for a long path with detours', () => {
    const maze = [
      ['S', '.', '.', '.', '.'],
      ['#', '#', '#', '#', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '#', '#', '#', '#'],
      ['.', '.', '.', '.', 'E'],
    ];

    expect(canEscape(maze)).toBeTruthy();
  });

  it('returns false when a full row blocks the path', () => {
    const maze = [
      ['S', '.', '.'],
      ['.', '.', '.'],
      ['#', '#', '#'],
      ['.', '.', 'E'],
    ];

    expect(canEscape(maze)).toBeFalsy();
  });
});
