import { describe, expect, expectTypeOf, it } from 'vitest';
import { hasFourInARow } from './18.ts';

describe('Challenge 18', () => {
  it('returns type boolean', () => {
    const panel = [
      ['R', '.', '.', '.'],
      ['.', 'R', '.', '.'],
      ['.', '.', 'R', '.'],
      ['.', '.', '.', 'R'],
    ];
    const result = hasFourInARow(panel);

    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  describe('diagonal checks', () => {
    it.each([
      [
        [
          ['R', '.', '.', '.'],
          ['.', 'R', '.', '.'],
          ['.', '.', 'R', '.'],
          ['.', '.', '.', 'R'],
        ],
      ],
      [
        [
          ['.', '.', '.', '.'],
          ['R', 'R', '.', '.'],
          ['.', 'R', 'R', '.'],
          ['.', '.', 'R', 'R'],
          ['.', '.', '.', 'R'],
        ],
      ],
      [
        [
          ['.', '.', '.', 'G'],
          ['.', '.', 'G', '.'],
          ['.', 'G', '.', '.'],
          ['G', '.', '.', '.'],
        ],
      ],
    ])('returns true for diagonal contiguous lights', (board) => {
      expectTypeOf(board).toEqualTypeOf<string[][]>();

      const result = hasFourInARow(board);

      expect(result).toBeTruthy();
    });
  });

  describe('horizontal / vertical checks', () => {
    it.each([
      [
        [
          ['R', 'R', 'R', 'R'],
          ['.', 'G', '.', '.'],
          ['.', '.', 'R', '.'],
          ['G', '.', '.', 'R'],
        ],
      ],
      [
        [
          ['G', '.', '.', '.'],
          ['G', 'G', '.', '.'],
          ['G', '.', 'R', '.'],
          ['G', '.', '.', 'R'],
        ],
      ],
    ])(
      'returns true when four same-color lights are contiguous horizontally or vertically',
      (board) => {
        const result = hasFourInARow(board);

        expect(result).toBeTruthy();
      },
    );
  });

  describe('edge cases', () => {
    it('returns false when the panel is smaller than 4x4', () => {
      const panel = [
        ['R', 'G', 'R'],
        ['G', 'R', 'G'],
        ['G', 'R', 'G'],
      ];

      expect(hasFourInARow(panel)).toBeFalsy();
    });
  });
});
