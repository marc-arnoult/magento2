import fs from 'node:fs';
import path from 'node:path';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { generateBaseConfig } from '../../rollup.base.config';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.graphql'];

const plugins = [
  nodeResolve({
    extensions,
  }),
  typescript({
    rollupCommonJSResolveHack: false,
    useTsconfigDeclarationDir: true,
    objectHashIgnoreUnknownHack: false,
    // eslint-disable-next-line unicorn/prefer-module
    tslib: require.resolve('typescript'),
  }),
];

const directoryPath = path.join(__dirname, 'src/composables');

const result = [
  generateBaseConfig(pkg),
];

const composables = fs.readdirSync(directoryPath);

composables.forEach((composable) => {
  result.push({
    input: `src/composables/${composable}/index.ts`,
    output: {
      format: 'es',
      sourcemap: true,
      file: `lib/composables/${composable}.js`,
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins,
  });
});

export default result;
