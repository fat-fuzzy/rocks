<script context="module"></script>

<script>
	// Inputs
	import {browser} from '$app/environment'
	export let size = 'md'
	export let icon = ''
	export let variant = 'primary'
	export let id = 'btn'
	export let disabled = false
	export let type = 'button'

	// Event Handlers
	export let onClick = (event) => {
		if (browser) {
			window.alert('Button cicked')
		}
	}
	$: className = `${icon} ${size} ${variant}`
</script>

<button data-test={id} on:click={onClick} class={className} {disabled} {type}>
	<slot />
</button>
