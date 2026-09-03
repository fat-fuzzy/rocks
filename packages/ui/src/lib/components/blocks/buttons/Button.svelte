<script lang="ts">
	import type {ButtonProps} from '$types'
	import styleHelper from '$lib/utils/styles'

	let {
		id = 'button',
		name = 'button',
		ref = $bindable(),
		label,
		ariaLabel,
		value,
		disabled,
		formaction,
		align,
		justify = 'center',
		asset, // the `value` in emoji:value or svg:value
		assetType,
		color,
		size,
		font,
		shape,
		variant,
		dimensions,
		popovertarget,
		anchorName,
		type = 'submit',
		children,
		onclick,
	}: ButtonProps = $props()

	function handleClick() {
		if (onclick) onclick(payload)
	}

	let buttonStyles = $derived(
		styleHelper.getStyles({
			color,
			size,
			font,
			shape,
			align,
			justify,
			asset,
			assetType,
			variant,
			layout: shape ? 'flex' : 'switcher',
			dimensions,
		}),
	)

	let buttonClasses = $derived(
		anchorName ? `anchor  ${buttonStyles}` : buttonStyles,
	)

	let payload = $derived({
		id,
		name,
		value,
	})

	let isIconButton = $derived(
		asset && asset !== 'none' && (shape === 'round' || shape === 'square'),
	)
</script>

<button
	bind:this={ref}
	{id}
	{type}
	{name}
	{disabled}
	{formaction}
	{value}
	class={buttonClasses}
	data-key={name}
	onclick={handleClick}
	data-testid={id}
	{popovertarget}
	aria-label={ariaLabel ?? (isIconButton ? (label ?? name) : undefined)}
	style={anchorName ? `--anchor-name: --${anchorName}` : ''}
>
	{#if children}
		{@render children()}
	{:else if !isIconButton}
		{label}
	{/if}
</button>
