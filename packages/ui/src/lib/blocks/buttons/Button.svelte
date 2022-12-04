<svelte:options accessors={true} />

<script lang="ts">
	// Inputs
	import {browser} from '$app/environment'
	export let size = 'md'
	export let icon = ''
	export let variant = 'primary' // TODO: Figure algorithmic light/dark + alt button color schemes
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
	$: className = `${icon} ${size} ${variant}`
</script>

<button {id} data-test={id} on:click={onClick} class={className} {disabled} {type}>
	<slot>{text}</slot>
</button>
