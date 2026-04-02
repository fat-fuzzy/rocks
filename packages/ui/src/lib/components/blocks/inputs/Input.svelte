<script lang="ts">
	import type {InputProps} from '$types'
	import styleHelper from '$lib/utils/styles'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		type,
		label,
		hint,
		value = $bindable(),
		required,
		pattern,
		font,
		size,
		color,
		variant,
		onfocus,
		onblur,
		oninput,
		disabled,
		validator,
		autocomplete,
	}: InputProps = $props()

	// TODO: map errors to Constraint Validation API
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation

	let errors = $derived(
		validator && validator?.fieldHasChanged(name)
			? validator?.getFieldErrors(name)
			: [],
	)

	let inputClasses = $derived(
		styleHelper.getStyles({
			font,
			size,
			color,
			variant,
		}),
	)
</script>

<label class={`l:stack:${size} ${inputClasses}`}>
	{label}
	<input
		{id}
		data-testid={id}
		{type}
		{name}
		bind:value
		{required}
		{pattern}
		{onfocus}
		{onblur}
		{oninput}
		{disabled}
		{autocomplete}
		aria-describedby={errors ? `input-feedback-${id}` : undefined}
		aria-invalid={errors && errors.length > 0}
	/>
</label>

<Feedback id={`input-feedback-${id}`} {hint} {errors} {size} {variant} {font} />
