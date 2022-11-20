<script>
	import {theme} from '$lib/stores/theme'
	let variant = ``

	$: variant = $theme ? `accent` : `highlight`
</script>

<svelte:head>
	<title>Sandbox</title>
	<meta name="description" content="A sandbox for experimenting with web app interfaces." />
</svelte:head>

<header>
	<h1>Welcome to the Fat Fuzzy UI library project Sandbox</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the SvekteKit documentation</p>
</header>

<section class="l-wrapper u-side xxl">
	<h2>✨ Highlights</h2>
	<ul class="l-stack lg no-list">
		<li class={`card ${variant}`}>
			<div>👾</div>
			<a data-sveltekit-prefetch href="/play"> Play</a>
		</li>
		<li class={`card ${variant}`}>
			<div>🤖</div>
			<a data-sveltekit-prefetch href="/machines"> Machines</a>
		</li>
	</ul>
</section>
