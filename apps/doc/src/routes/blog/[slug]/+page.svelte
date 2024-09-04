<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	let post = $derived($page.data)
</script>

{#key post.title}
	<PageMain pageName="Blog" title={post.title} description={post.description}>
		{#snippet header()}
			<h1 class="l:side hug maki:block:md">{post.title}</h1>
			<div class="l:main:50 l:flex justify:end">
				<p class="feedback:prose status:default variant:bare card:sm">
					Published: {post.date_created}
				</p>
			</div>
		{/snippet}
		<article class="l:sidebar:md">
			<div class="l:text:lg">
				<EscapeHtml html={post.html} />
			</div>
		</article>
	</PageMain>
{/key}
