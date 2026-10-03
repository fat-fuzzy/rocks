<script lang="ts">
	import type {InputProps} from '#types'
	import styleHelper from '#lib/utils/styles.js'
	import Feedback from '#lib/components/blocks/inputs/InputFeedback.svelte'

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
		asset,
		assetType,
		variant,
		onfocus,
		onblur,
		oninput,
		disabled,
		errors = [],
		autocomplete,
	}: InputProps = $props()

	// TODO: map errors to Constraint Validation API
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation

	let inputClasses = $derived(
		styleHelper.getStyles({
			font,
			size,
			color,
			variant,
		}),
	)
</script>

<label for={id} class={`l:stack:${size} ${inputClasses}`}>
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
		aria-describedby={errors.length > 0 ? `input-feedback-${id}` : undefined}
		aria-invalid={errors.length > 0}
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
	asset={asset ?? 'none'}
	{assetType}
/>
