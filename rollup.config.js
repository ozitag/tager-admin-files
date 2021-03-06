import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'TagerAdminFiles',
    },
  ],
  external: [
    'vue',
    '@vue/composition-api',
    '@tager/admin-services',
    '@tager/admin-ui',
    '@tager/admin-layout',
    'path-to-regexp',
    'lodash.kebabcase',
  ],
  plugins: [
    typescript(),
    vue(),
    resolve({ extensions: ['.ts', '.js', '.css', '.svg', '.vue'] }),
    commonjs(),
  ],
};
