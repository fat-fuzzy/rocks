<script lang="ts">
	import type {InputProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		label,
		value = $bindable(),
		size,
		font,
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
			variant,
		}),
	)
</script>

<label class={`l:stack:${size} ${inputClasses}`} data-testid={id}>
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
		aria-describedby="input-feedback-{id}"
	/>
</label>

<Feedback {id} {errors} {size} {variant} {font} />
