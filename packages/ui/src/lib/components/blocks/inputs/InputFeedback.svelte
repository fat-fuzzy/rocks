<script lang="ts">
	import type {InputFeedbackProps} from '$types'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {
		id,
		size,
		font,
		variant,
		assetType,
		asset,
		hint,
		errors,
	}: InputFeedbackProps = $props()

	const fontClass = $derived(font ? `font:${font}` : '')
</script>

{#if hint}
	<Feedback
		id={`input-feedback-${id}`}
		{assetType}
		{asset}
		status="default"
		context="form"
		{size}
		{font}
		{variant}
	>
		<p>{hint}</p>
	</Feedback>
{/if}

{#if errors?.length}
	<Feedback
		{id}
		context="form"
		status="error"
		{size}
		{variant}
		{font}
		{assetType}
		{asset}
	>
		{#each errors as message, i (i)}
			<p class={`status:error ${fontClass}`}>{message}</p>
		{/each}
	</Feedback>
{/if}
