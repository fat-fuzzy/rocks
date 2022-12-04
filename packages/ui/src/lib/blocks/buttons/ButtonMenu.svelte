<script lang="ts">
	import Button from '../buttons/Button.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()
	export let layout = `stack`
	export let size = `md`
	export let variant = 'primary'

	export let items: {
		id: string
		title: string
		type: string
		emoji?: string
		disabled?: boolean
	}[] = [
		{id: 'btn-1', title: 'Button 1', type: 'button'},
		{id: 'btn-2', title: 'Button  2', type: 'button'},
		{id: 'btn-3', title: 'Button  3', type: 'button'},
	]

	let selected = ''
	function formatText(title, emoji) {
		return emoji ? `${emoji} ${title}` : title
	}
	const onClick = (event) => {
		selected = event.target.getAttribute('id')
		dispatch('input', {
			selected,
		})
	}
</script>

import Button from '../buttons/Button.svelte'
<menu class={`l-${layout} ${size}`} role="group">
	{#each items as { id, title, emoji }}
		<li>
			<Button {id} {onClick} variant={id === selected ? 'outline' : variant}>
				{formatText(title, emoji)}
			</Button>
		</li>
	{/each}
</menu>
