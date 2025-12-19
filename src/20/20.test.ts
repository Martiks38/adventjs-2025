import { describe, expect, expectTypeOf, it } from 'vitest';
import { dropGifts } from './20.ts';

describe('Challenge 20 - dropGifts', () => {
  it('should return an array of array of string', () => {
    const board = [
      ['.', '.', '.'],
      ['.', '#', '.'],
      ['#', '#', '.'],
    ];

    const result = dropGifts(board, [0]);

    expectTypeOf(result).toEqualTypeOf<string[][]>();
  });

  it('returns a new empty array when warehouse is empty', () => {
    const board: string[][] = [];

    const result = dropGifts(board, [0, 1]);

    expect(result).toEqual([]);
    expect(result).not.toBe(board);
  });

  it('drops a gift in the lowest available cell of the given column', () => {
    const board = [
      ['.', '.', '.'],
      ['.', '#', '.'],
      ['#', '#', '.'],
    ];

    const result = dropGifts(board, [0]);

    const expectedResult = [
      ['.', '.', '.'],
      ['#', '#', '.'],
      ['#', '#', '.'],
    ];

    expect(result).toEqual(expectedResult);
  });

  it('drops gifts independently in multiple columns', () => {
    const board = [
      ['.', '.', '.'],
      ['#', '#', '.'],
      ['#', '#', '#'],
    ];

    const result = dropGifts(board, [0, 2]);

    const expectedResult = [
      ['#', '.', '.'],
      ['#', '#', '#'],
      ['#', '#', '#'],
    ];

    expect(result).toEqual(expectedResult);
  });

  it('places gifts on the bottom row when the board is empty', () => {
    const board = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];

    const result = dropGifts(board, [0, 1, 2]);

    const expectedResult = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['#', '#', '#'],
    ];

    expect(result).toEqual(expectedResult);
  });

  it('does nothing if the column is already full', () => {
    const board = [
      ['#', '#'],
      ['#', '#'],
    ];

    const result = dropGifts(board, [0, 1, 2]);

    const expectedResult = [
      ['#', '#'],
      ['#', '#'],
    ];

    expect(result).toEqual(expectedResult);
  });

  describe('edge cases', () => {
    it('should ignore column out of range', () => {
      const board = [
        ['.', '.'],
        ['.', '.'],
      ];

      const result = dropGifts(board, [2, -1]);

      expect(result).not.toBe(board);
    });

    it('should return the same board when the number list is empty', () => {
      const board = [
        ['.', '.'],
        ['.', '.'],
      ];

      const result = dropGifts(board, []);

      expect(result).not.toBe(board);
    });

    it('should put the gifts in the only row', () => {
      const board = [['.', '.', '.']];

      const result = dropGifts(board, [0, 2]);

      const expectedResult = [['#', '.', '#']];

      expect(result).toEqual(expectedResult);
    });

    it('should put the gifts in the only column', () => {
      const board = [['.'], ['#'], ['#']];

      const result = dropGifts(board, [0]);

      const expectedResult = [['#'], ['#'], ['#']];

      expect(result).toEqual(expectedResult);
    });
  });
});
