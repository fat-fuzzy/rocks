<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.blocks

	let app = fatFuzzyStore.app
	
	let brightness = $derived(app.settings.brightness)
	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)

	let images = $derived({
		src: !brightness || brightness === 'day' ?  '/images/day/001-intro' :  '/images/night/001-intro',
		alt: `A drawing: "Creating a web app. Where to Start ?" asks a girl underneath a large cloud with a laptop connected to it and displaying an app in a browser. The cloud contains three boards: to the left is the CLIENT, which contains HTML, CSS, and JavaScript; to the right are RESOURCES which contain backend data and application logic; in the middle is the API, which connects the CLIENT to the RESOURCES using HTTP, URLs, JSON, REST, GraphQL, and enables calls to CRUD operations.`,
	})
	let variant = 'surface:2:primary'
</script>

<PageMain {title} {description} size="md" justify="center">
	{#snippet header()}
		<div class="l:center:md">
			<div class="l:frame">
					<Picture
						src={images.src}
						ext="png"
						alt={images.alt}
						width="2647"
						height="1869"
						sources={[
							['2647', '1869', 'png'],
							['2647', '1869', 'webp'],
						]}
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
