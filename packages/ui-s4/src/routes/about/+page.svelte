<script lang="ts">
	import {headless} from '$lib'

	const {Head} = headless
	let title = 'About'
	$: headerClass = 'l:flex card:sm col:center bg:polar align:center w:full'
</script>

<Head page="About" description="About this website" />

<header class={headerClass}>
	<h1 class="card:md">{title}</h1>
</header>

<div class="l:center:xxl col:center">
	<div class="card:xl l:text:xl">
		<p>
			This is a <a href="https://kit.svelte.dev" class="font:md">SvelteKit</a> app. You can make your
			own by typing the following into your command line and following the prompts:
		</p>

		<pre>npm create svelte@latest</pre>

		<p>
			The page you're looking at is purely static HTML, with no client-side interactivity needed.
			Because of that, we don't need to load any JavaScript. Try viewing the page's source, or
			opening the devtools network panel and reloading.
		</p>
	</div>
</div>
