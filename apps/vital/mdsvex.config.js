import {defineMDSveXConfig as defineConfig} from 'mdsvex'
import extractComments from './scripts/remark/extract-comments.js'

const config = defineConfig({
	extensions: ['.md', '.svx'],
	smartypants: {
		dashes: 'oldschool',
	},
	remarkPlugins: [extractComments],
	rehypePlugins: [],
})

export default config
