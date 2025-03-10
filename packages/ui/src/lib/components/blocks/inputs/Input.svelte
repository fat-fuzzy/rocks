<script lang="ts">
	import type {InputProps} from '$types'
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
	let fontClass = $derived(font ? `font:${font}` : '')
</script>

<label class={`l:stack:${size} ${fontClass}`}>
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
