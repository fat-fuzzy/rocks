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
			margin-left: getVar(margin-md);
		}
	}
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
		min-width: calc(50% - getVar(margin-md));
		text-align: center;
		border-radius: 3px;
		border: 1px solid getVar(color-dark);
		padding: getVar(padding-sm) 0;
		min-height: 4em;
	}
	.card a {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
