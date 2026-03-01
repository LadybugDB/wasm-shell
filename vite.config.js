import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

function copyLib() {
  return {
    name: 'copy-lib',
    closeBundle() {
      const srcDir = resolve(__dirname, 'lib');
      const destDir = resolve(__dirname, 'dist/lib');
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }
      const files = ['index.js', 'lbug_wasm_worker.js'];
      files.forEach(file => {
        copyFileSync(resolve(srcDir, file), resolve(destDir, file));
      });
      const syncSrcDir = resolve(__dirname, 'sync');
      const syncDestDir = resolve(__dirname, 'dist/sync');
      if (!existsSync(syncDestDir)) {
        mkdirSync(syncDestDir, { recursive: true });
      }
      copyFileSync(resolve(syncSrcDir, 'index.js'), resolve(syncDestDir, 'index.js'));
    }
  };
}

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    plugins: [copyLib()],
  },
  server: {
    port: 3000,
    host: true,
    fs: {
      allow: ['..'],
    },
  },
  optimizeDeps: {
    exclude: ['@ladybugdb/wasm-core']
  }
});
