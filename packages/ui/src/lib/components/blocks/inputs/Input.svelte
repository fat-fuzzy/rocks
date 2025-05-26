<script lang="ts">
	import type {InputProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		type,
		label,
		value = $bindable(),
		required,
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

	let errors = $derived(validator.getFieldErrors(name))
	let inputClasses = $derived(
		styleHelper.getStyles({
			font,
			size,
			color,
			variant,
		}),
	)
</script>

<label class={`l:stack size:${size} ${inputClasses}`}>
	{label}
	<input
		{id}
		data-testid={id}
		{type}
		{name}
		bind:value
		{required}
		{onfocus}
		{onblur}
		{oninput}
		{disabled}
		{autocomplete}
	/>
</label>

<Feedback {id} {errors} {size} {variant} {font} />
