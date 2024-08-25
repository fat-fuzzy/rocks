import blog from '$data/blog'
import validation from '@fat-fuzzy/validation'
export const prerender = true

const {sanitizePlainText} = validation.sanitize
const months = ',Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')

function formatPubdate(str: string) {
	const [y, m, d] = str.split('-')
	return `${d} ${months[+m]} ${y} 12:00 +0000`
}

const get_rss = (posts) =>
	`
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
	<title>Fat Fuzzy Blog</title>
	<link>https://rocks.pages.dev/blog</link>
	<description></description>
	<image>
		<url>https://rocks.pages.dev/favicon.png</url>
		<title>Fat Fuzzy Blog</title>
		<link>https://rocks.pages.dev/blog</link>
	</image>
	${posts
		.map(
			(post) => `
		<item>
			<title>${sanitizePlainText(post.meta.title)}</title>
			<link>https://rocks.pages.dev/blog/${post.meta.slug}</link>
			<description>${sanitizePlainText(post.html)}</description>
			<pubDate>${formatPubdate(post.meta.date_created)}</pubDate>
		</item>
	`,
		)
		.join('')}
</channel>

</rss>
`
		.replace(/>[^\S]+/gm, '>')
		.replace(/[^\S]+</gm, '<')
		.trim()

export async function GET() {
	const posts = await blog.markdowns.filter(({meta}) => meta.status !== 'draft')

	return new Response(get_rss(posts), {
		headers: {
			'Cache-Control': `max-age=${30 * 60 * 1e3}`,
			'Content-Type': 'application/rss+xml',
		},
	})
}
