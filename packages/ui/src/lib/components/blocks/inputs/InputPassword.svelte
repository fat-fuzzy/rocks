<script lang="ts">
	import type {InputProps} from '$types'
	import {UiStatus} from '$types'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		label,
		value = $bindable(),
		size,
		onfocus,
		onblur,
		oninput,
		disabled,
		validator,
	}: InputProps = $props()

	let errors = $derived(validator.getFieldErrors(name))
</script>

<label class={`l:stack:${size}`}>
	{label}
	<input
		{id}
		type="password"
		{name}
		bind:value
		required
		{onfocus}
		{onblur}
		{oninput}
		{disabled}
	/>
</label>

<Feedback {errors} {size} />
