<script>
	import {theme} from '../stores.js'
	let variant = ``

	$: variant = $theme ? `accent` : `highlight`
</script>

<svelte:head>
	<title>Sandbox</title>
	<meta name="description" content="A sandbox for experimenting with web app interfaces." />
</svelte:head>

<header>
	<h1>✨ Highlights</h1>
</header>

<section class="l-wrapper u-side xxl">
	<ul class="l-stack lg no-list">
		<li class={`card ${variant}`}>
			<div>👾</div>
			<a sveltekit:prefetch href="/play"> Play</a>
		</li>
		<li class={`card ${variant}`}>
			<div>🤖</div>
			<a sveltekit:prefetch href="/machines"> Machines</a>
		</li>
	</ul>
</section>
