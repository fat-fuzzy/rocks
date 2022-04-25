<svelte:options accessors={true} />

<script>
	// Inputs
	export let label = 'Click'
	export let size = 'md'
	export let icon = ''
	export let variant = 'primary'
	export let testId = 'btn'
	export let disabled = false

	// Event Handlers
	export let handleClick = () => {}

	$: className = `${icon} ${size} ${variant}`
</script>

<button data-test={testId} on:click={handleClick} class={className} aria-label={label} {disabled}>
	<slot />
</button>
