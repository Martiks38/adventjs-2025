import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts', '**/*.spec.ts'],
    reporters: 'default',
    clearMocks: true,
    restoreMocks: true,
    watch: false,
    testTimeout: 5_000,
  },
});
