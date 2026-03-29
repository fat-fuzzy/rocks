<script lang="ts">
	import type {ButtonProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'button',
		name = 'button',
		ref,
		label,
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
		type = 'submit',
		children,
		onclick,
	}: ButtonProps = $props()

	function handleClick() {
		if (onclick) onclick(payload)
	}

	let buttonClasses = $derived(
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
	aria-label={isIconButton ? (label ?? name) : undefined}
>
	{#if children}
		{@render children()}
	{:else if !isIconButton}
		{label}
	{/if}
</button>
