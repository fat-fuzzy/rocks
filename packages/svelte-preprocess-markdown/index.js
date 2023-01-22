import markdown from '@fat-fuzzy/markdown'

export default function sveltePreprocessMarkdown() {
	return {
		/**
		 * @param {{ content: string, filename?: string }} param
		 */
		async markup({content, filename}) {
			if (!filename || !filename.endsWith('.md')) return

			const result = await markdown.compile(content)

			return result.toString()
		},
	}
}
