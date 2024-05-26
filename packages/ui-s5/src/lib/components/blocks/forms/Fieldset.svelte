<script lang="ts">
	import type {FieldsetProps} from './input.types.js'

	let {
		id,
		name,
		legend,
		type, // input group if any
		disabled,

		align,
		color,
		container,
		layout = 'stack',
		justify,
		size = 'sm',
		variant,
		breakpoint,
		background,
		threshold,
		children,
	}: FieldsetProps = $props()

	let containerClass = container ? `l:${container}:${size}` : ''
	let thresholdClass = threshold ? `th:${threshold}` : ''
	let breakpointClass = breakpoint ? `bp:${breakpoint}` : ''
	let layoutClass = layout
		? `l:${layout}:${size} ${thresholdClass} ${breakpointClass}`
		: ''
	let backgroundClass = background ? `bg:${background}` : ''
	let fontClass = size ? `font:${size}` : ''
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let contentClass = `${sizeClass} ${fontClass} ${variantClass} ${alignClass} ${justifyClass} ${type || ''}`
	let classes = `${layoutClass} ${containerClass} ${backgroundClass} ${variantClass} ${contentClass}`
</script>

<fieldset {name} data-key={id} class={classes} {disabled}>
	{#if legend}<legend class={sizeClass}>{legend}</legend>{/if}
	{#if children}
		{@render children()}
	{/if}
</fieldset>
