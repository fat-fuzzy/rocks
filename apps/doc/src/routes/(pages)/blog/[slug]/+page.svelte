<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {Aside} = ui.drafts
	const {EscapeHtml} = ui.headless

	let post = $derived($page.data)
	let title = $derived(post.index ? `${post.title}: Part ${post.index}` : post.title)
</script>

{#key post.id}
	<PageMain pageName="Blog" title={title} description={post.description}>
		{#snippet header()}
			<div class="l:main:50 maki:block:md">
				<h1>{title}</h1>
				{#if post.subtitle}<p class="h4">{post.subtitle}</p>{/if}
				{#if post.description}<p>{post.description}</p>{/if}
			</div>
			<div class="l:side">
				<Aside created={post.date_created}  updated={post.date_updated}  series={post.series} page={post.index}/>
			</div>
		{/snippet}
		<article class="l:sidebar:md">
			<div class="l:text:lg">
				<EscapeHtml html={post.html} />
			</div>
		</article>
	</PageMain>
{/key}
