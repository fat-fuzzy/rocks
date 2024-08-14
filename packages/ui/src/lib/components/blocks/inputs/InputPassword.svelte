<script lang="ts">
	import type {InputProps} from '$types'
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
		feedback,
		disabled,
	}: InputProps = $props()
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

<Feedback messageGroup={feedback} {size} />
