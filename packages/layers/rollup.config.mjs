import config from '../../rollup.config.mjs';

export default {
  ...config,
  input: './src/index.ts',
  plugins: [...config.plugins]
};
