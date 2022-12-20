<script lang="ts">
	import {browser} from '$app/environment'
	import Button from '../buttons/Button.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()
	export let layout = 'switcher'
	export let size = 'md'
	export let breakpoint = 'bp:md'
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

	let clickedId = ''
	const formatText = (title, emoji) => {
		return emoji ? `${emoji} ${title}` : title
	}
	export let onClick = (event) => {
		if (browser) {
			window.alert(`${event.target.textContent} Clicked`)
		}
		clickedId = event.target.id
		dispatch('click', {
			clicked: clickedId,
		})
	}
</script>

<menu class={`l-${layout} ${size} ${breakpoint}`} role="group">
	{#each items as { id, title, emoji }}
		<li>
			<Button {id} {onClick} variant={id === clickedId ? `alt ${variant}` : variant}>
				{formatText(title, emoji)}
			</Button>
		</li>
	{/each}
</menu>
