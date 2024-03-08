import path from 'path';

// import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
// import typescript from '@rollup/plugin-typescript';
// import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';

const shouldMinify = process.env.NODE_ENV === 'production';
const bundle = ['tslib'];
const external = [
  'react',
  'react-dom',
  'styled-components',
  '@craftjs/utils',
  '@craftjs/core',
];

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      interop: 'compat',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled',
      },
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      interop: 'compat',
    },
  ],
  external: (id) => {
    return (
      external.includes(id) ||
      (!id.startsWith('.') && !path.isAbsolute(id) && !bundle.includes(id))
    );
  },
  plugins: [
    // del({ targets: 'dist/*' }),
    resolve(),
    typescript({
      // declarationDir: 'dist',
    }),
    // babel({
    //   babelHelpers: 'bundled',
    //   extensions: ['.ts'],
    //   presets: [
    //     ['@babel/preset-typescript'],
    //     [
    //       '@babel/preset-env',
    //       {
    //         modules: false,
    //         targets: {
    //           browsers: ['>0.25%, not dead'],
    //         },
    //       },
    //     ],
    //   ],
    //   plugins: [
    //     '@babel/proposal-class-properties',
    //     '@babel/proposal-object-rest-spread',
    //   ],
    // }),
    shouldMinify &&
      terser({
        output: { comments: 'some' },
        compress: {
          keep_infinity: true,
          pure_getters: true,
          passes: 10,
        },
        ecma: 5,
        warnings: true,
        mangle: {
          reserved: ['Canvas'],
        },
      }),
  ],
};
