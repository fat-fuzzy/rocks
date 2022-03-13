<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let tabs = []
	export let current = 0
</script>

<ul>
	{#each tabs as { name, type, id }}
		<li class:active={id === current} on:click={() => dispatch('select', id)}>
			<!-- @TODO: make tabs nav items <a href=""></a> -->
			{name}.{type}
		</li>
	{/each}
	<!-- <li><button>+</button></li> -->
</ul>

<style>
	.active {
		font-weight: 900;
		text-decoration: underline;
	}
</style>
