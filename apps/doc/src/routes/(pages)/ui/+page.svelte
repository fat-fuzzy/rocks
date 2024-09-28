<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import {api} from '@fat-fuzzy/playbook'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	const {PlaybookCollection} = api

	let path = $derived($page.url.pathname)
	let actionPath = '/ui'
	let title = 'Fat Fuzzy UI'
	let description = `${title} | Doc`

	const categories = ['tokens', 'blocks', 'layouts', 'recipes']

	let content = $derived($page.data.content)
	let markdowns = $derived($page.data.markdowns)
</script>

<PageMain {title} {description} size="md">
	<article class="l:sidebar:md">
		<section class="l:main">
			<div class="l:text:lg snap:start">
				<EscapeHtml html={content.html} />
			</div>
			{#each categories as category}
				<PlaybookCollection
					{category}
					{markdowns}
					{actionPath}
					depth={1}
					isPage={false}
					path={`${path}/${category}`}
					redirect={$page.url.pathname}
					{content}
				>
					<EscapeHtml
						html={markdowns.categories.find(({meta}) => meta.slug === category)
							.html}
					/>
				</PlaybookCollection>
			{/each}
		</section>
	</article>
</PageMain>
