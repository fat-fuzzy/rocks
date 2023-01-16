<script lang="ts">
	import Toggle from '../buttons/Toggle.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()
	export let id = ''
	export let size = 'sm'
	export let layout = 'stack'
	export let color = ''
	export let variant = ''
	export let multiple = false

	export let items: {
		id: string
		label: string
		type?: string
		icon?: string
		disabled?: boolean
	}[] = [
		{id: 'btn-toggle-1', label: 'Toggle 1'},
		{id: 'btn-toggle-2', label: 'Toggle 2'},
		{id: 'btn-toggle-3', label: 'Toggle 3'},
	]

	let selected: {id: string; pressed: boolean; send: (event: string) => unknown}[] = []

	const formatText = (label, icon) => {
		return icon ? `${icon} ${label}` : label
	}

	export let onToggle = (event: any) => {
		if (multiple) {
			if (event.detail.pressed) {
				selected = [...selected, event.detail]
			} else {
				selected = selected.filter((c) => c.id !== event.detail.id)
			}
		} else {
			if (event.detail.pressed) {
				selected.map((c) => {
					if (c.id !== event.detail.id && c.pressed) {
						c.send('TOGGLE')
					}
				})
			}
			selected = [event.detail]
		}
		dispatch('changed', {
			selected,
		})
	}
</script>

<menu class={`l-${layout} ${size}`}>
	{#each items as { id, label, icon }}
		<li>
			<Toggle {id} on:toggle={onToggle} {variant} {color} text={formatText(label, icon)} />
		</li>
	{/each}
</menu>
