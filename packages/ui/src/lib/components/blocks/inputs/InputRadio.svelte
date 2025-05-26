<script lang="ts">
	import type {InputProps} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {
		id,
		name,
		label = 'Radio input',
		checked = false,
		disabled,
		value,
		required,
		status = UiStatus.default,
		hint,

		layout = 'switcher',
		asset,
		align,
		justify,
		color,
		size,
		font,
		variant,
		background,
		container,

		oninput,
	}: InputProps = $props()

	function handleInput(event: Event) {
		if (oninput) oninput(event)
	}

	let classes = $derived(
		styleHelper.getStyles({
			color,
			font,
			size,
			align,
			justify,
			asset,
			variant,
			layout,
			container,
			background: background ? background : 'inherit',
		}),
	)
</script>

<label for={id} class={`ravioli:${size} ${classes} nowrap`} data-testid={id}>
	<span>{label}</span>
	<input
		{id}
		type="radio"
		bind:value
		{name}
		{checked}
		{required}
		oninput={handleInput}
		{disabled}
	/>
</label>

{#if hint}
	<Feedback
		{id}
		{asset}
		{status}
		context={UiTextContext.form}
		{size}
		{font}
		{variant}
	>
		{hint}
	</Feedback>
{/if}
