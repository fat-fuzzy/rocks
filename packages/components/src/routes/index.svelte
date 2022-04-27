<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import {theme} from '../stores.js'

	let currentTheme = $theme

	theme.subscribe((value) => {
		currentTheme = value
	})

	$: cardClass = currentTheme === 'bg-light' ? `card accent` : `card highlight`
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
		<li class={cardClass}>
			<a sveltekit:prefetch href="/play">Play</a>
		</li>
		<li class={cardClass}>
			<a sveltekit:prefetch href="/machines">Machines</a>
		</li>
	</ul>
</section>
