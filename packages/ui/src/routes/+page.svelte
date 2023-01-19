<script lang="ts">
	import {themes} from '$lib/types/constants'
	import {theme} from '$lib/stores/theme'
	let variant = ``

	$: currentTheme = themes[$theme]
	$: variant = $theme ? `accent` : `highlight`
</script>

<svelte:head>
	<title>UI Sandbox</title>
	<meta name="description" content="A sandbox for experimenting with web app interfaces." />
</svelte:head>

<header>
	<h1>Fat Fuzzy Sandbox</h1>
	<p>Welcome to the Fat Fuzzy UI library Sandbox!</p>
</header>

<section class="l-text:md l-center">
	<h2>✨ Highlights</h2>
	<ul class="l-stack xl" role="group">
		<li class={`card ${variant}`}>
			<span>👾</span>
			<a data-sveltekit-preload-data href="/play"> Play</a>
		</li>
		<li class={`card ${variant}`}>
			<span>🤖</span>
			<a data-sveltekit-preload-data href="/machines"> Machines</a>
		</li>
	</ul>
</section>
