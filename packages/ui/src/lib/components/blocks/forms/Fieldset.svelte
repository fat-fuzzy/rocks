<script lang="ts">
	export let id = ''
	export let name = ''
	export let legend = ''
	export let size = 'sm'
	export let color = ''
	export let background = ''
	export let layout = 'stack'
	export let container = ''
	export let align = 'start'
	export let breakpoint = ''
	export let variant = '' // intrinsic variations in design: [box/bare/layer] [card]
	export let type = '' // group /

	$: containerClass = container ? `l:${container}:${size}` : ''
	$: backgroundClass = background ? `bg:${background}` : ''
	$: classes = `l:${layout} bp:${breakpoint} ${containerClass} ${size} ${variant} ${color} ${backgroundClass} align:${align} ${type}`
</script>

<fieldset {id} {name} data-key={id} class={classes}>
	{#if legend}<legend class={`font:${size}`}>{legend}</legend>{/if}<slot />
</fieldset>
