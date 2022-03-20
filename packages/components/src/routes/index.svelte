<script context="module" lang="ts">
	export const prerender = true
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Current Experiments</h1>

<ul class="projects">
	<li class="card">
		<a sveltekit:prefetch href="/play">Play</a>
	</li>
	<li class="card">
		<a sveltekit:prefetch href="/machines">Machines</a>
	</li>
</ul>

<style lang="scss">
	@import '../styles/config/main.scss';

	.projects {
		list-style: none;
		padding-left: 0;
		display: flex;

		& > * + * {
			margin-left: 0.2em;
		}
	}
	.card {
		min-width: calc(50% - 0.2em);
		text-align: center;
		padding: 2em 0;
		border-radius: 3px;
		border: 1px solid getVar(color-dark);
	}
</style>
