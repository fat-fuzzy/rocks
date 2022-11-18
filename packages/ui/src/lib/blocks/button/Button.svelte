<svelte:options accessors={true} />

<script>
	// Inputs
	export let size = 'md'
	export let icon = ''
	export let variant = 'primary'
	export let testId = 'btn'
	export let disabled = false
	export let type = 'button'

	// Event Handlers
	export let handleClick = () => {}

	$: className = `${icon} ${size} ${variant}`
</script>

<button data-test={testId} on:click={handleClick} class={className} {disabled} {type}>
	<slot />
</button>
