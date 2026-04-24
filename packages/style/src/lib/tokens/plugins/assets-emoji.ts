export default function emojiAsset() {
	return {
		name: 'emoji-assets',
		async transform({tokens, setTransform}) {
			for (const [id, token] of Object.entries(tokens)) {
				switch (token.$type) {
					case 'asset-emoji': {
						setTransform(id, {
							format: 'js',
							name: id.split('.')[2],
							value: `"${token.$value}"`,
						})
						setTransform(id, {
							format: 'ts',
							name: id.split('.')[2],
							value: `"${token.$value}"`,
						})
						setTransform(id, {
							format: 'css',
							name: id.split('.')[2],
							localID: `--${id.split('.').join('-')}`, // custom local ID
							value: `"${token.$value}"`,
						})
						break
					}
				}
			}
		},

		async build({getTransforms, outputFile}) {
			this.buildTokensJS({getTransforms, outputFile})
			this.buildTokensTS({getTransforms, outputFile})
			this.buildTokensCSS({getTransforms, outputFile})
		},

		buildTokensJS({getTransforms, outputFile}) {
			const output = []

			output.push('const tokens = {')

			const Tokens = getTransforms({
				format: 'js',
				id: 'emoji.icon.*',
			})
			for (const token of Tokens) {
				if (token.localID) {
					output.push(`${token.localID}: ${token.value},`)
				}
			}
			output.push('};', '', 'export default tokens;', '')
			outputFile('assets-emoji.js', output.join('\n'))
		},

		buildTokensTS({getTransforms, outputFile}) {
			const tsOutput = []
			tsOutput.push('export type EmojiIcon = ')
			const svgTypes = getTransforms({
				format: 'ts',
				id: 'emoji.icon.*',
			})
			for (const token of svgTypes) {
				if (token.localID) {
					tsOutput.push(token.value)
				}
			}
			tsOutput.push('', '')
			outputFile('assets-emoji.ts', tsOutput.join('\n'))
		},

		buildTokensCSS({getTransforms, outputFile}) {
			const output = []

			const Tokens = getTransforms({
				format: 'css',
				id: 'emoji.icon.*',
				mode: '.',
			})
			for (const token of Tokens) {
				if (token.localID) {
					const name = token.value

					console.log(name)

					output.push(
						`
.emoji\\:${token.name}:not(.justify\\:end, .place\\:end)::before,
.emoji\\:${token.name}.justify\\:start::before {
	content: var(${token.localID});
}

.emoji\\:${token.name}.place\\:end::after,
.emoji\\:${token.name}.justify\\:end::after {
	content: var(${token.localID});
}
`,
					)
				}
			}
			output.push('')
			outputFile('assets-emoji.css', output.join('\n'))
		},
	}
}
