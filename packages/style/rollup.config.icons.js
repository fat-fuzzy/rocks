/**
 * This config will preprocess scss in `src/lib/scss/` and output a bundled CSS file to "src/mixins/index.css"
 */
export default {
	input: 'src/assets/icons/index.js',
	output: function (assets, nodes) {
		Object.entries(nodes).forEach(([id, content]) => {
			const outputPath = path.join('dist', path.relative('src', id))
			fs.mkdirSync(path.dirname(outputPath), {recursive: true})
			fs.writeFileSync(outputPath, content)
		})
	}, // will output compiled styles to "dist/assets/icons.svg" as separate files including the folder structure. Use in conjunction with exports in package.json to expose css files
}
