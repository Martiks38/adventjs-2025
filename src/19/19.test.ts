import { describe, expect, expectTypeOf, it } from 'vitest';
import { revealSantaRoute } from './19.ts';

describe('Challenge 19', () => {
  it('should return an array of strings', () => {
    expectTypeOf(revealSantaRoute([])).toEqualTypeOf<string[]>();
  });

  it('should return an empty list when given an empty list', () => {
    const result = revealSantaRoute([]);

    expect(result).toEqual([]);
  });

  it('should return the full Santa route in the correct order', () => {
    const result = revealSantaRoute([
      ['MEX', 'CAN'],
      ['UK', 'GER'],
      ['CAN', 'UK'],
    ]);

    expect(result).toEqual(['MEX', 'CAN', 'UK', 'GER']);
  });

  it('should ignore disconnected routes and return the valid Santa route', () => {
    const result = revealSantaRoute([
      ['USA', 'BRA'],
      ['JPN', 'PHL'],
      ['BRA', 'UAE'],
      ['UAE', 'JPN'],
      ['CMX', 'HKN'],
    ]);

    expect(result).toEqual(['USA', 'BRA', 'UAE', 'JPN', 'PHL']);
  });

  it('should return the only available route when no full chain exists', () => {
    const result = revealSantaRoute([
      ['STA', 'HYD'],
      ['ESP', 'CHN'],
    ]);

    expect(result).toEqual(['STA', 'HYD']);
  });
});
