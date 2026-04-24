export default function svgAsset() {
	return {
		name: 'svg-assets',
		async transform({tokens, setTransform}) {
			for (const [id, token] of Object.entries(tokens)) {
				switch (token.$type) {
					case 'asset-svg': {
						setTransform(id, {
							format: 'js',
							localID: id.split('.')[1], // custom local ID
							value: JSON.stringify(Object.values(token.$value)),
						})
						setTransform(id, {
							format: 'ts',
							localID: id.split('.')[1], // custom local ID
							value: Object.values(token.$value)
								.map((value) => `'${value}'`)
								.join(' | '),
						})
						setTransform(id, {
							format: 'css',
							localID: `--${id.split('.').join('-')}`, // custom local ID
							value: JSON.stringify(Object.values(token.$value)),
						})
						break
					}
				}
			}
		},

		async build({getTransforms, outputFile}) {
			this.buildJsTokens({getTransforms, outputFile})
			this.buildTsTokens({getTransforms, outputFile})
			this.buildCssTokens({getTransforms, outputFile})
		},

		buildJsTokens({getTransforms, outputFile}) {
			const output = []

			output.push('const tokens = {')

			const svgTokens = getTransforms({
				format: 'js',
				id: 'svg.*',
			})
			for (const token of svgTokens) {
				if (token.localID) {
					output.push(`${token.localID}: ${token.value},`)
				}
			}
			output.push('};', '', 'export default tokens;', '')
			outputFile('assets-svg.js', output.join('\n'))
		},

		buildTsTokens({getTransforms, outputFile}) {
			const tsOutput = []
			tsOutput.push('export type SvgIcon = ')
			const svgTypes = getTransforms({
				format: 'ts',
				id: 'svg.*',
			})
			for (const token of svgTypes) {
				if (token.localID) {
					tsOutput.push(token.value)
				}
			}
			tsOutput.push('', '')
			outputFile('assets-svg.ts', tsOutput.join('\n'))
		},

		buildCssTokens({getTransforms, outputFile}) {
			const output = []

			const svgTokens = getTransforms({
				format: 'css',
				id: 'svg.*',
				mode: '.',
			})
			for (const token of svgTokens) {
				if (token.localID) {
					const assets = JSON.parse(token.value)
					if (Array.isArray(assets))
						assets.forEach((value) => {
							output.push(`
.svg\\:${value.split(':').join('\\:')} {
	--icon-url: url('/icons/${value}.svg');
}`)
						})
				}
			}
			output.push('')
			outputFile('assets-svg.css', output.join('\n'))
		},
	}
}
