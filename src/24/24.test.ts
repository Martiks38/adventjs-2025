import { describe, expect, it } from 'vitest';
import { isTreesSynchronized } from './24.ts';

describe('Challenge 24 - isTreesSynchronized', () => {
  it('returns true when trees are mirror images', () => {
    const tree1 = {
      value: '🎄',
      left: { value: '⭐' },
      right: { value: '🎅' },
    };

    const tree2 = {
      value: '🎄',
      left: { value: '🎅' },
      right: { value: '⭐' },
    };

    expect(isTreesSynchronized(tree1, tree2)).toEqual([true, '🎄']);
  });

  it('returns false when structure is mirrored but values differ', () => {
    const tree1 = {
      value: '🎄',
      left: { value: '⭐' },
      right: { value: '🎅' },
    };

    const tree2 = {
      value: '🎄',
      left: { value: '🎅' },
      right: { value: '🎁' },
    };

    expect(isTreesSynchronized(tree1, tree2)).toEqual([false, '🎄']);
  });

  it('returns false when trees have same structure but are not mirrored', () => {
    const tree1 = {
      value: '🎄',
      left: { value: '⭐' },
      right: { value: '🎅' },
    };

    const tree2 = {
      value: '🎄',
      left: { value: '⭐' },
      right: { value: '🎅' },
    };

    expect(isTreesSynchronized(tree1, tree2)).toEqual([false, '🎄']);
  });

  it('returns false when root values are different', () => {
    expect(isTreesSynchronized({ value: '🎅' }, { value: '🧑‍🎄' })).toEqual([
      false,
      '🎅',
    ]);
  });

  it('works with deeper mirrored trees', () => {
    const tree1 = {
      value: '🎄',
      left: {
        value: '🎁',
        left: { value: '⭐' },
      },
      right: {
        value: '🎁',
        right: { value: '⭐' },
      },
    };

    const tree2 = {
      value: '🎄',
      left: {
        value: '🎁',
        left: { value: '⭐' },
      },
      right: {
        value: '🎁',
        right: { value: '⭐' },
      },
    };

    expect(isTreesSynchronized(tree1, tree2)).toEqual([true, '🎄']);
  });

  it('handles undefined trees correctly', () => {
    expect(isTreesSynchronized(undefined, undefined)).toEqual([
      true,
      undefined,
    ]);

    expect(isTreesSynchronized({ value: '🎄' }, undefined)).toEqual([
      false,
      '🎄',
    ]);
  });
});
