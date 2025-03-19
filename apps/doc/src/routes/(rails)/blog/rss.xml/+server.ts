/**
 * Adapted from svelte.dev website's RSS feed: https://github.com/sveltejs/svelte/tree/main/sites/svelte.dev/src/routes/blog/rss.xml
 * more resources:
 * - https://www.davidwparker.com/posts/how-to-make-an-rss-feed-in-sveltekit
 */
import blog from '$data/blog'
import validation from '@fat-fuzzy/validation'
export const prerender = true

const {sanitizePlainText} = validation.sanitize
const months = ',Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')

function formatPubdate(str: string) {
	const [y, m, d] = str.split('-')
	return `${d} ${months[+m]} ${y} 12:00 +0000`
}

/**
 * Validate with: https://validator.w3.org/feed/
 * @param posts
 * @returns an RSS feed
 */
const get_rss = (posts) =>
	`
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">

<channel>
	<atom:link href="https://rocks.pages.dev/blog/rss.xml" rel="self" type="application/rss+xml" />
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
			<guid isPermaLink="false">fat-fuzzy:blog:${sanitizePlainText(post.meta.id)}:${sanitizePlainText(post.meta.slug)}</guid>
			<link>https://rocks.pages.dev/blog/${post.meta.slug}</link>
			<description>${sanitizePlainText(post.meta.description)}</description>
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
	const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

	return new Response(get_rss(posts), {
		headers: {
			'Cache-Control': `max-age=${30 * 60 * 1e3}`,
			'Content-Type': 'application/rss+xml',
		},
	})
}
