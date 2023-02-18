<script lang="ts">
	export let id = ''
	export let name = ''
	export let legend = ''
	export let type = ''
	export let size = 'sm'
	export let layout = 'stack'
	export let container = 'burrito'
	export let breakpoint = 'md'

	$: className = `l:${layout}:${size} l:${container}:${size} bp:${breakpoint} ${size} ${type}`
</script>

<fieldset {id} {name} data-key={id} class={className}>
	{#if legend}<legend>{legend}</legend>{/if}
	<slot />
</fieldset>
