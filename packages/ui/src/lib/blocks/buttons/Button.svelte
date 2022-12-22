<svelte:options accessors={true} />

<script lang="ts">
	// Inputs
	import {browser} from '$app/environment'
	export let size = ''
	export let icon = ''
	export let color = ''
	export let variant = '' // TODO: Figure algorithmic light/dark + alt button color schemes
	export let id = 'btn'
	export let disabled = false
	export let type = 'submit'
	export let text = 'Button'

	// Event Handlers
	export let onClick = (event) => {
		if (browser) {
			window.alert(`${text} Clicked`)
		}
	}
	$: className = `${icon} ${size} ${variant} ${color}`
</script>

<button {id} data-test={id} on:click={onClick} class={className} {disabled} {type}>
	<slot>{text}</slot>
</button>
