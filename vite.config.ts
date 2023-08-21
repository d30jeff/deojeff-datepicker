import { defineConfig } from 'vite';
import react from 'vite-preset-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      injectReact: true,
      removeDevtoolsInProd: true,
    }),
    tsconfigPaths(),
  ],
});
