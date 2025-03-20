<script lang="ts">
	import type {FieldsetProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id,
		name,
		legend,
		type, // input group if any
		disabled,
		align,
		container,
		layout = 'stack',
		justify,
		font,
		size = 'sm',
		variant,
		breakpoint,
		background,
		threshold,
		children,
	}: FieldsetProps = $props()

	let sizeClass = $derived(size ? `size:${size}` : '')
	let fontClass = $derived(font ? `font:${font}` : '')
	let typeClass = $derived(type || '')
	let classes = $derived(
		styleHelper.getStyles({
			size,
			font,
			align,
			justify,
			variant,
			background,
			layout,
			breakpoint,
			threshold,
			container,
		}),
	)
</script>

<fieldset {name} data-key={id} class={`${classes} ${typeClass}`} {disabled}>
	{#if legend}<legend class={`${fontClass} ${sizeClass}`}>{legend}</legend>{/if}
	{#if children}
		{@render children()}
	{/if}
</fieldset>
