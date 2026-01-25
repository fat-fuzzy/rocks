<script lang="ts">
	import type {ButtonProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'button',
		name = 'button',
		title,
		label,
		value,
		disabled,
		formaction,
		align,
		justify = 'center',
		asset, // the `value` in emoji:value or svg:value
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
			variant,
			layout: shape && shape !== 'pill' ? undefined : 'switcher',
			dimensions,
		}),
	)

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
	})
</script>

<button
	{id}
	{type}
	{name}
	{title}
	{disabled}
	{formaction}
	{value}
	class={buttonClasses}
	data-key={name}
	onclick={handleClick}
	data-testid={id}
	{popovertarget}
>
	{#if children}
		{@render children()}
	{:else if shape}
		<span class="sr-only">{title}</span>
	{:else}
		{label ?? title}
	{/if}
</button>
