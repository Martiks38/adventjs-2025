import { describe, expect, it } from 'vitest';
import { filterGifts } from './01.ts';

describe('Challenge 01', () => {
  it('Return type array', () => {
    const result = filterGifts(['car', 'doll#arm', 'ball', '#train']);

    expect(Array.isArray(result)).toBeTruthy();
  });

  it('Should return an array of strings', () => {
    const result = filterGifts(['car', 'doll#arm', 'ball', '#train']);

    expect(result.every((item) => typeof item === 'string')).toBeTruthy();
  });

  it("Returns ['car', 'ball'] for gift list  ['car', 'doll#arm', 'ball', '#train']", () => {
    const gifts = ['car', 'doll#arm', 'ball', '#train'];
    const result = filterGifts(gifts);

    expect(result.length).toBe(2);
    expect(result).toEqual(['car', 'ball']);
  });

  it('Returns [] when all gifts are defective', () => {
    const gifts = ['#broken', '#rusty'];
    const result = filterGifts(gifts);

    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  });

  it('Returns [] when the list is empty', () => {
    const gifts: string[] = [];
    const result = filterGifts(gifts);

    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  });
});
