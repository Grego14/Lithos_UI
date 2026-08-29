import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/index.ts', 'src/components/ui', 'src/core', 'src/utils'],
      exclude: [
        'src/main.tsx',
        'src/App.tsx',
        'src/components/blocks/**',
        'src/docs/**',
        'src/tests/**',
        '**/*.test.tsx',
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LithosUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      // Ensure we don't bundle these dependencies
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@floating-ui/react',
        'clsx',
        'tailwind-merge',
        // Externalize react-icons to avoid bundling all of them, let consumer resolve them
        /^react-icons/,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    // We will build tokens.css separately
    cssCodeSplit: false,
  },
})
