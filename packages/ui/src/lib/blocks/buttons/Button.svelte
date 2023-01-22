<svelte:options accessors={true} />

<script lang="ts">
	// Inputs
	import {browser} from '$app/environment'
	import format from '../../utils/format'
	export let size = ''
	export let icon = ''
	export let color = ''
	export let variant = '' // TODO: Figure algorithmic day/night + alt button color schemes
	export let id = 'btn'
	export let disabled = false
	export let text = 'Button'

	// Event Handlers
	export let onClick = (event) => {
		if (browser) {
			window.alert(`${text} Clicked`)
		}
	}

	$: classes = `${size} ${variant} ${color}`
</script>

<button {id} data-test={id} on:click={onClick} class={classes} {disabled}>
	<slot>{format.formatLabel(text, icon)}</slot>
</button>
