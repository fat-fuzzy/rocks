<script lang="ts">
	export let id = ''
	export let name = ''
	export let legend = ''
	export let size = 'sm'
	export let color = ''
	export let background = ''
	export let layout = 'stack'
	export let container = ''
	export let align = ''
	export let justify = ''
	export let threshold = ''
	export let breakpoint = ''
	export let variant = '' // intrinsic variations in design: [box/bare/layer] [card]
	export let type = '' // group /

	$: containerClass = container ? `l:${container}:${size}` : ''
	$: thresholdClass = threshold ? `th:${threshold}` : ''
	$: breakpointClass = breakpoint ? `bp:${breakpoint}` : ''
	$: layoutClass = layout ? `l:${layout}:${size} ${thresholdClass} ${breakpointClass}` : ''
	$: backgroundClass = background ? `bg:${background}` : ''
	$: sizeClass = size ? `font:${size}` : ''
	$: alignClass = align ? `align:${align}` : ''
	$: justifyClass = justify ? `justify:${justify}` : ''
	$: variantClass = variant ? `${variant}:${size}` : ''
	$: contentClass = `${sizeClass} ${variantClass} ${alignClass} ${justifyClass} ${type || ''} ${
		color || ''
	}`
	$: classes = `${layoutClass} ${containerClass} ${backgroundClass} ${variantClass} ${contentClass}`
</script>

<fieldset {name} data-key={id} class={classes}>
	{#if legend}<legend class={sizeClass}>{legend}</legend>{/if}<slot />
</fieldset>
