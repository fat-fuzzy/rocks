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
		{name}
		type="checkbox"
		bind:checked
		{required}
		oninput={handleInput}
		{disabled}
		aria-describedby="input-feedback-{id}"
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
