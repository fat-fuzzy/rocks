import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkGfm from 'remark-gfm'
import remarkStringify from 'remark-stringify'

async function compile(content) {
	const file = await unified()
		.use(rehypeParse)
		.use(remarkGfm)
		.use(rehypeRemark)
		.use(remarkStringify)
		.process(content)
	return file
}

export default {
	compile,
}
