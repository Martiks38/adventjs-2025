import { describe, expect, it } from 'vitest';
import { execute } from './25.ts';

describe('Challenge 25 - execute', () => {
  it('increments value correctly', () => {
    expect(execute('+++')).toBe(3);
  });

  it('decrements value correctly', () => {
    expect(execute('+--')).toBe(-1);
  });

  it('handles the MOVE instruction with no side effects', () => {
    expect(execute('>+++')).toBe(3);
  });

  it('executes a loop until the value reaches zero', () => {
    expect(execute('>+++[-]')).toBe(0);
  });

  it('executes the conditional block only when the value is not zero', () => {
    expect(execute('>>>+{++}')).toBe(3);
  });

  it('executes nested conditionals and loops properly', () => {
    expect(execute('+{[-]+}+')).toBe(2);
  });

  it('skips conditional blocks when the value is zero', () => {
    expect(execute('{+}{+}{+}')).toBe(0);
  });

  it('loops once if the loop body cannot change the value', () => {
    expect(execute('------[+]++')).toBe(2);
  });

  it('supports conditionals inside loops and executes after breaking the loop', () => {
    expect(execute('-[++{-}]+{++++}')).toBe(5);
  });

  describe('edge cases', () => {
    it('returns 0 for an empty program', () => {
      expect(execute('')).toBe(0);
    });

    it('skips an entire loop if the value is zero at loop start', () => {
      expect(execute('[-]++++')).toBe(4);
    });

    it('skips an entire conditional block if value is zero at start', () => {
      expect(execute('{++++}+')).toBe(1);
    });
  });
});
