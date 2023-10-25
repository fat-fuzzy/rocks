<script lang="ts">
	export let id = ''
	export let name = ''
	export let legend = ''
	export let type = ''
	export let size = 'sm'
	export let layout = 'stack'
	export let container = 'burrito'
	export let breakpoint = ''

	$: containerClass = container ? `l:${container}:${size}` : ''
	$: classes = `l:${layout} bp:${breakpoint} ${containerClass} ${size} ${type}`
</script>

<fieldset {id} {name} data-key={id} class={classes}>
	{#if legend}<legend>{legend}</legend>{/if}
	<slot />
</fieldset>
