<script lang="ts">
	import type {InputProps} from '$types'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		label,
		value = $bindable(),
		size,
		variant,
		onfocus,
		onblur,
		oninput,
		disabled,
		validator,
		autocomplete,
	}: InputProps = $props()

	let errors = $derived(validator.getFieldErrors(name))
</script>

<label class={`l:stack:${size}`}>
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
	/>
</label>

<Feedback {errors} {size} {variant} />
