<script lang="ts">
	import type {InputProps} from '$types'
	import styleHelper from '#lib/utils/styles.js'
	import Feedback from '#lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		label,
		hint,
		value = $bindable(),
		size,
		font,
		variant,
		onfocus,
		onblur,
		oninput,
		disabled,
		autocomplete,
		errors = [],
	}: InputProps = $props()

	let inputClasses = $derived(
		styleHelper.getStyles({
			font,
			size,
			variant,
		}),
	)
</script>

<label for={id} class={`l:stack:${size} ${inputClasses}`} data-testid={id}>
	{label}
	<input
		{id}
		data-testid={id}
		type="password"
		{name}
		bind:value
		required
		{onfocus}
		{onblur}
		{oninput}
		{disabled}
		{autocomplete}
		aria-describedby={hint || errors.length
			? `input-feedback-${id}`
			: undefined}
	/>
</label>

<Feedback
	context="form"
	id={`input-feedback-${id}`}
	{hint}
	{errors}
	{size}
	{variant}
	{font}
/>
