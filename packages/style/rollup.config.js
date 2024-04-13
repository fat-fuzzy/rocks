import * as glob from 'glob';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'node:path';

const production = process.env.NODE_ENV === 'production';
const inDir = path.resolve('src/lib')
const outDir = path.resolve('dist')
const cssFiles = glob.sync('src/lib/css/**/*.css');

// Always clean the dist folder before building.
fs.rmSync(outDir, {recursive: true, force: true});
fs.mkdirSync(outDir);

export default {
	input: `${inDir}/index.js`,
  output: {dir: outDir, format: 'esm'},
  plugins: [
    scss({
      input: cssFiles,
			fileName: 'main.css',
      output: function(styles, styleNodes) {
        Object.entries(styleNodes).forEach(([id, content]) => {
          const outputPath = path.join('dist', path.relative('src', id));
          fs.mkdirSync(path.dirname(outputPath), {recursive: true});
          fs.writeFileSync(outputPath, content);
        });
      },
      // ...
    }),
    postcss({
      extract: 'main.css',
      plugins: [
        autoprefixer(),
        // Add more PostCSS plugins here as needed
      ],
      minimize: production,
      sourceMap: !production,
    }),
  ],
};