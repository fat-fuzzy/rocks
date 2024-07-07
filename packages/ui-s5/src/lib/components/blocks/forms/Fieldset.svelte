<script lang="ts">
	import type {FieldsetProps} from './input.types.js'
	import styleHelper from '../blocks.styles.js'

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
		size = 'sm',
		variant,
		breakpoint,
		background,
		threshold,
		children,
	}: FieldsetProps = $props()

	let sizeClass = size ? `size:${size}` : ''
	let typeClass = type || ''
	let classes = $derived(styleHelper.getStyles({
			size,
			align,
			justify,
			variant,
			background,
			layout,
			breakpoint,
			threshold,
			container,
		}))
</script>

<fieldset {name} data-key={id} class={`${classes} ${typeClass}`} {disabled}>
	{#if legend}<legend class={sizeClass}>{legend}</legend>{/if}
	{#if children}
		{@render children()}
	{/if}
</fieldset>
