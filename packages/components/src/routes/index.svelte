<script context="module" lang="ts">
	export const prerender = true
</script>

<svelte:head>
	<title>Sandbox</title>
</svelte:head>

<header>
	<h1>✨ Project Highlights</h1>
</header>

<section class="l-wrapper xl">
	<ul class="l-switcher no-list xs">
		<li class="card">
			<a sveltekit:prefetch href="/play">Play</a>
		</li>
		<li class="card">
			<a sveltekit:prefetch href="/machines">Machines</a>
		</li>
	</ul>
</section>
