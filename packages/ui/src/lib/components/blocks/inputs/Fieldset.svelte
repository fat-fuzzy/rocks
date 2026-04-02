<script lang="ts">
	import type {FieldsetProps} from '$types'
	import styleHelper from '$lib/utils/styles'

	let {
		id,
		name,
		legend,
		ariaDescribedby,
		type, // input group if any
		disabled,
		align,
		container,
		layout = 'stack',
		justify,
		font,
		size = 'sm',
		variant,
		color,
		asset,
		assetType,
		breakpoint,
		background,
		threshold,
		children,
	}: FieldsetProps = $props()

	let typeClass = $derived(type || '')

	let legendClasses = $derived(
		styleHelper.getStyles({
			size,
			font,
			justify,
			asset,
			assetType,
			layout: 'flex',
		}),
	)

	let fieldsetClasses = $derived(
		styleHelper
			.getStyles({
				size,
				font,
				align,
				justify,
				variant,
				color,
				background,
				layout,
				breakpoint,
				threshold,
				container,
			})
			.trim(),
	)
</script>

<fieldset
	{name}
	data-key={id}
	class={`${fieldsetClasses} ${typeClass}`}
	{disabled}
	data-testid={id}
	aria-describedby={ariaDescribedby}
>
	{#if legend}<legend class={legendClasses}>{legend}</legend>{/if}
	{#if children}
		{@render children()}
	{/if}
</fieldset>
