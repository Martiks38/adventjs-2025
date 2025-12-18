import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/', 'src/**/index.ts'],
    },
    environment: 'node',
    include: ['**/*.test.ts', '**/*.spec.ts'],
    reporters: 'default',
    clearMocks: true,
    restoreMocks: true,
    watch: false,
    testTimeout: 5_000,
  },
});
