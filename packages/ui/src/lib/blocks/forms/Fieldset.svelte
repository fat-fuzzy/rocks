<script lang="ts">
	export let id = ''
	export let name = ''
	export let legend = ''
	export let type = ''
	export let size = 'sm'
	export let layout = 'stack'
	export let container = 'burrito'
	export let breakpoint = ''

	$: classes = `l:${layout} bp:${breakpoint} l:${container}:${size} ${size} ${type}`
</script>

<fieldset {id} {name} data-key={id} class={classes}>
	{#if legend}<legend>{legend}</legend>{/if}
	<slot />
</fieldset>
