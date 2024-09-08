<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {Aside} = ui.drafts
	const {EscapeHtml} = ui.headless

	let post = $derived($page.data)
</script>

{#key post.title}
	<PageMain pageName="Blog" title={post.title} description={post.description}>
		{#snippet header()}
			<h1 class="l:main:50 maki:block:md">{post.title}</h1>
			<Aside created={post.date_created}  updated={post.date_updated}/>
		{/snippet}
		<article class="l:sidebar:md">
			<div class="l:text:lg">
				<EscapeHtml html={post.html} />
			</div>
		</article>
	</PageMain>
{/key}
