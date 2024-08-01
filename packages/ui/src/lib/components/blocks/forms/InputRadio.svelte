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
		status = UiStatus.default,
		hint,

		layout = 'switcher',
		asset,
		align,
		justify,
		color,
		size,
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
			font: size,
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
		value,
	})
</script>

<label for={id} class={classes}>
	<span>{label}</span>
	<input
		{id}
		type="radio"
		{value}
		{name}
		{checked}
		oninput={handleInput}
		data-test={id}
		{disabled}
	/>
</label>
{#if hint}
	<Feedback {status} context={UiTextContext.form} {size} {variant}>
		{hint}
	</Feedback>
{/if}
