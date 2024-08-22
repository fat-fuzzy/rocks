<script lang="ts">
	import type {InputFeedbackProps} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {size, variant, errors}: InputFeedbackProps = $props()
</script>

{#if errors?.length}
	<Feedback
		context={UiTextContext.form}
		status={UiStatus.error}
		{size}
		{variant}
	>
		{#each errors as message}
			<p class={`status:error`}>{message}</p>
		{/each}
	</Feedback>
{/if}
