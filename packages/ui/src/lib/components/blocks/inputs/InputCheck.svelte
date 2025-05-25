<script lang="ts">
	import type {InputProps} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {
		id,
		name,
		label = 'Checkbox input',
		checked,
		disabled,
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

	function handleInput(event) {
		if (oninput) oninput(payload)
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

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value: checked,
	})
</script>

<label for={id} class={classes} data-testid={id}>
	<span>{label}</span>
	<input
		{id}
		{name}
		type="checkbox"
		bind:checked
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
		{font}
		{size}
		{variant}
	>
		{hint}
	</Feedback>
{/if}
