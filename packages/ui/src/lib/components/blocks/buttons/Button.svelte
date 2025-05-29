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
		shape,
		variant,
		dimensions,
		type = 'submit',
		children,
		onclick,
	}: ButtonProps = $props()

	function handleClick(event: MouseEvent) {
		if (onclick) onclick(payload)
	}

	let buttonClasses = $derived(
		styleHelper.getStyles({
			color,
			size,
			shape,
			align,
			justify,
			asset,
			variant,
			layout: shape && shape !== 'pill' ? '' : 'switcher',
			dimensions,
		}),
	)

	let payload = $state({
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
>
	{#if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
</button>
