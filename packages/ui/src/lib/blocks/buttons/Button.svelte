<svelte:options accessors={true} />

<script lang="ts">
	// Inputs
	import {browser} from '$app/environment'
	export let size = 'md'
	export let icon = ''
	export let variant = 'primary'
	export let id = 'btn'
	export let disabled = false
	export let type = 'submit'
	export let text = 'Button'

	// Event Handlers
	export let onClick = (event) => {
		if (browser) {
			window.alert('Button cicked')
		}
	}
	$: className = `${icon} ${size} ${variant}`
</script>

<button data-test={id} on:click={onClick} class={className} {disabled} {type}>
	<slot>{text}</slot>
</button>
