<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import {api} from '@fat-fuzzy/playbook'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	const {PlaybookCollection} = api

	let path = $derived(page.url.pathname)

	let formaction = 'updateState'
	let title = 'Fat Fuzzy UI'
	let description = `${title} | Doc`

	const categories = ['tokens', 'blocks', 'layouts', 'recipes']

	let content = $derived(page.data.content)
	let markdowns = $derived(page.data.markdowns)
	let slug = $derived(content.meta.slug)
</script>

<PageMain {title} {description} size="md">
	<article class="l:sidebar:md">
		<section class="l:main">
			<EscapeHtml id={slug} html={content.html} size="md" />
			{#each categories as category}
				<PlaybookCollection
					{category}
					{markdowns}
					depth={1}
					isPage={false}
					path={`${path}/${category}${page.url.hash}`}
					{formaction}
					actionPath={path}
					redirect={path}
					{content}
				>
					<EscapeHtml
						id={`${slug}-${category}`}
						html={markdowns.categories.find(({meta}) => meta.slug === category)
							.html}
						size="md"
					/>
				</PlaybookCollection>
			{/each}
		</section>
	</article>
</PageMain>
