<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	
	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless
	const {Scrolly} = ui.drafts

	let animations = $state($page.data.animations)
	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
</script>

<PageMain {title} {description} size="md" justify="center">
	{#snippet header()}
		<div class="surface:0:neutral w:full">
			<h1 class="card:md text:center">Fat Fuzzy Rocks</h1>
		</div>
	{/snippet}
	<Scrolly animations={['fade']} fixed={true} items={animations[0].media} level={1}/>
</PageMain>
