<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.drafts

	let images = $derived($page.data)

	let app = fatFuzzyStore.app
	
	let brightness = $derived(app.settings?.brightness || '')
	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let media = $derived(brightness ? images[brightness]:  images['day'])
	let variant = 'surface:2:primary'
</script>

<PageMain {title} {description} size="md" justify="center">
	{#snippet header()}
		<div class="l:center:md">
			<div class="l:frame">
				<Picture
					src={media.src}
					ext={media.ext}
					alt={media.alt}
					orientation={media.orientation}
					width={media.width}
					height={media.height}
					sources={media.sources}
				/>
			</div>
			<h1 class="card:sm text:center">Fat Fuzzy Rocks</h1>
		</div>
	{/snippet}

	<section class="l:center:md">
		<div class="l:text:lg col:center w:full">
			<EscapeHtml {html} />
		</div>
		<div class="maki:block:2xl">
			<ul class="l:switcher:sm unstyled">
				<li class={`card:lg text:center emoji:recipes ${variant}`}>
					<a data-sveltekit-preload-data href="/ui" class="card font:md">UI Library</a>
				</li>
				<li class={`card:lg text:center emoji:rainbow ${variant}`}>
					<a data-sveltekit-preload-data href="/play" class="card font:md">Graphics</a>
				</li>
			</ul>
		</div>
	</section>
</PageMain>
