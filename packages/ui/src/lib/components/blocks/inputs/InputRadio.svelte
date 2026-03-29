<script lang="ts">
	import type {InputRadioProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		label = 'Radio input',
		checked = false,
		disabled,
		value,
		required,
		hint,
		layout = 'switcher',
		threshold = '2xs',
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
		validator,
	}: InputRadioProps = $props()

	let errors = $derived(
		name && validator && validator?.fieldHasChanged(name)
			? validator?.getFieldErrors(name)
			: [],
	)

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
			threshold,
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
		{checked}
		{value}
		{name}
		{required}
		{oninput}
		{disabled}
		aria-describedby={hint || errors?.length
			? `input-feedback-${id}`
			: undefined}
	/>
</label>

<Feedback id={`input-feedback-${id}`} {hint} {errors} {size} {variant} {font} />
