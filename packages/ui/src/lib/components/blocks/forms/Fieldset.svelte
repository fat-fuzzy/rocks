<script lang="ts">
	export let id = ''
	export let name = ''
	export let legend = ''
	export let type = '' // input-group (radio group, checkbox group ...) Or other type TBD
	export let size = 'sm'
	export let layout = 'stack'
	export let container = 'burrito'
	export let align = 'start'
	export let breakpoint = ''
	export let variant = 'box card' // intrinsic variations in design: [box/bare/layer] [card]

	$: containerClass = container ? `l:${container}:${size}` : ''
	$: classes = `l:${layout} bp:${breakpoint} ${containerClass} ${size} ${type} ${variant} align:${align}`
</script>

<fieldset {id} {name} data-key={id} class={classes}>
	{#if legend}<legend>{legend}</legend>{/if}
	<slot />
</fieldset>
