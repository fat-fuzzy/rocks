<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	// TODO; conditional import
	import introDay from '$lib/images/day/001-intro.png' // TODO : optimize images
	import introNight from '$lib/images/night/001-intro.png' // TODO : optimize images

	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)

let theme = 1
const pageImage = {
	src: theme === 1 ? introDay : introNight,
	alt: `A drawing: "Creating a web app. Where to Start ?" asks a girl underneath a large cloud with a laptop connected to it and displaying an app in a browser. The cloud contains three boards: to the left is the CLIENT, which contains HTML, CSS, and JavaScript; to the right are RESOURCES which contain backend data and application logic; in the middle is the API, which connects the CLIENT to the RESOURCES using HTTP, URLs, JSON, REST, GraphQL, and enables calls to CRUD operations.`,
}
let variant = 'surface:2:primary'
</script>

<PageMain {title} {description} size="md" justify="center">
	{#snippet header()}
		<div class="l:center:md">
			<div class="l:frame">
				<img src={pageImage.src} alt={pageImage.alt} />
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
