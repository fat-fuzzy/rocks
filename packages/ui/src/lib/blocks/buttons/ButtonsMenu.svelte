<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()
	export let layout = `stack`
	export let size = `md`
	export let items: {id: string; title: string; emoji?: string}[] = [
		{id: 'btn-1', title: 'Button 1'},
		{id: 'btn-2', title: 'Button  2'},
		{id: 'btn-3', title: 'Button  3'},
		{id: 'btn-4', title: 'Button  4'},
		{id: 'btn-5', title: 'Button  5'},
		{id: 'btn-6', title: 'Button  6'},
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

<menu class={`l-${layout} ${size} list-none`}>
	{#each items as { id, title, emoji }}
		<li>
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
		</li>
	{/each}
</menu>
