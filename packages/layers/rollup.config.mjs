import config from '../../rollup.config.mjs';

export default {
  ...config,
  input: './src/index.tsx',
  plugins: [...config.plugins]
};
