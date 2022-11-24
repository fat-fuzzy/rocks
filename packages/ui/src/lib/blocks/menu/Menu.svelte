<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()
	export let layout = `stack`
	export let size = `md`
	export let menuItems: {id: string; title: string; emoji?: string}[] = [
		{id: 'item-1', title: 'Item 1'},
		{id: 'item-2', title: 'Item  2'},
	]

	let selected = ''
	function getLabel(title, emoji) {
		return emoji ? `${emoji} ${title}` : title
	}
	const handleClick = (event) => {
		const element = event.target
		selected = element.getAttribute('id')
		dispatch('input', {
			selected,
		})
	}
</script>

<menu class={`l-${layout} ${size}`}>
	{#each menuItems as { id, title, emoji }}
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
