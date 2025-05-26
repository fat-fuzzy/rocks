<script lang="ts">
	import type {InputFeedbackProps} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {id, size, font, variant, errors}: InputFeedbackProps = $props()
</script>

{#if errors?.length}
	<Feedback
		id={`input-feedback-${id}`}
		context={UiTextContext.form}
		status={UiStatus.error}
		{size}
		{variant}
		{font}
	>
		{#each errors as message}
			<p class={`status:error ${{font}}`}>{message}</p>
		{/each}
	</Feedback>
{/if}
