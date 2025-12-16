import { packGifts } from './16.ts';
import { describe, expect, it } from 'vitest';

describe('Challenge 16', () => {
  it('Return type number', () => {
    const result = packGifts([2, 3, 4, 1], 5);

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
  });

  it("Return null. Gift don't fit on the sleighs", () => {
    const result = packGifts([10], 5);

    expect(result).toBeNull();
  });

  it('Return 2 for [2, 3, 4, 1] and capacity 5', () => {
    const result = packGifts([2, 3, 4, 1], 5);

    expect(result).toBe(2);
  });

  it('Return 0 when there are no gifts', () => {
    const result = packGifts([], 5);

    expect(result).toBe(0);
  });

  it("Return null when a gift don't fit on the sleigh", () => {
    const result = packGifts([2, 3, 4, 10, 5], 5);

    expect(result).toBeNull();
  });

  it('Return 1 for [1] and capacity 1', () => {
    const result = packGifts([1], 1);

    expect(result).toBe(1);
  });

  it('Return 4 for [5, 5, 5, 5] and capacity 5', () => {
    const result = packGifts([5, 5, 5, 5], 5);

    expect(result).toBe(4);
  });
});
