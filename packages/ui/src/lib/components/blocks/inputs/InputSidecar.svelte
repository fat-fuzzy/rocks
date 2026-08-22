<script lang="ts">
	import type {InputProps, ButtonProps} from '$types'
	import styleHelper from '$lib/utils/styles'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
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
		shape = 'square',
		actionLabel = 'Apply',
		asset,
		assetType,
		justify = 'end',
		reverse,
		variant,
		onfocus,
		onblur,
		oninput,
		onclick,
		disabled,
		validator,
		autocomplete,
	}: InputProps & ButtonProps & {actionLabel?: string} = $props()

	// TODO: map errors to Constraint Validation API
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation

	let errors = $derived(
		validator && validator?.fieldHasChanged(name)
			? validator?.getFieldErrors(name)
			: [],
	)

	let labelClasses = $derived(
		styleHelper.getStyles({
			font,
			size,
			color,
			variant,
			layout: 'stack',
		}),
	)

	let inputClasses = $derived(
		styleHelper.getStyles({
			font,
			size,
			color,
		}),
	)

	let shapeProp = $derived.by(() => {
		if (asset && asset !== 'none') return shape
		else {
			if (shape === 'square') return 'soft'
			if (shape === 'round') return 'pill'
		}
		return shape
	})
</script>

<fieldset>
	<label for={id} class={labelClasses}>
		{label}
	</label>

	<div
		class={`sidecar l:grid size:${size} nowrap justify:${justify} ${reverse ?? ''}`}
	>
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
			class={inputClasses}
			aria-describedby={errors ? `input-feedback-${id}` : undefined}
			aria-invalid={errors && errors.length > 0}
		/>
		<Button
			id={`button-${id}`}
			name={`button-${id}`}
			type="button"
			{size}
			{font}
			{justify}
			label={actionLabel}
			ariaLabel={actionLabel}
			align="center"
			{color}
			shape={shapeProp}
			{variant}
			{asset}
			{assetType}
			{onclick}
		/>
	</div>
	<Feedback
		id={`input-feedback-${id}`}
		{hint}
		{errors}
		{size}
		{variant}
		{font}
	/>
</fieldset>
