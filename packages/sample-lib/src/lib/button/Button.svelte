<script context="module"></script>
<script >
	// Inputs
	export let size = 'md'
	export let icon = ''
	export let variant = 'primary'
	export let testId = 'btn'
	export let disabled = false
	export let type = 'button'

	// Event Handlers
	export let onClick = () => {}
	$: className = `${icon} ${size} ${variant}`
</script>

<button data-test={testId} on:click={onClick} class={className} {disabled} {type}>
	<slot />
</button>
