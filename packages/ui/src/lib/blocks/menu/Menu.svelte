<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()
	export let layout = `stack`
	export let size = `md`
	export let items: {id: string; title: string; emoji?: string}[] = [
		{id: 'item-1', title: 'Item 1'},
		{id: 'item-2', title: 'Item  2'},
		{id: 'item-3', title: 'Item  3'},
		{id: 'item-4', title: 'Item  4'},
		{id: 'item-5', title: 'Item  5'},
		{id: 'item-6', title: 'Item  6'},
	]

	let selected = ''
	function getLabel(title, emoji) {
		return emoji ? `${emoji} ${title}` : title
	}
	const handleClick = (event) => {
		selected = event.target.getAttribute('id')
		dispatch('input', {
			selected,
		})
	}
</script>

<menu class={`l-${layout} ${size}`}>
	{#each items as { id, title, emoji }}
		<button
			type="button"
			class:outline={id === selected}
			on:click={handleClick}
			{id}
			data-test={id}
		>
			<!--TODO: make routes for animations-->
			{getLabel(title, emoji)}
		</button>
	{/each}
</menu>
