<script lang="ts">
	import type {InputFeedbackProps} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {size, messageGroup}: InputFeedbackProps = $props()
	let feedback: UiStatus[] = $derived(
		messageGroup ? (Object.keys(messageGroup) as UiStatus[]) : [],
	)

	let hasErrors = $derived(feedback.includes(UiStatus.error))
</script>

{#if messageGroup && messageGroup.error}
	<Feedback
		context={UiTextContext.form}
		status={hasErrors ? UiStatus.error : UiStatus.default}
		{size}
	>
		{#if messageGroup.title}
			<p class="font:semibold">{messageGroup.title}</p>
		{/if}
		{#each messageGroup.error as message}
			<p class={`status:error`}>{message}</p>
		{/each}
	</Feedback>
{/if}
