<script lang="ts">
	import type {InputFeedbackProps} from '$types'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {id, size, font, variant, errors}: InputFeedbackProps = $props()

	const fontClass = $derived(font ? `font:${font}` : '')
</script>

{#if errors?.length}
	<Feedback {id} context="form" status="error" {size} {variant} {font}>
		{#each errors as message}
			<p class={`status:error ${fontClass}`}>{message}</p>
		{/each}
	</Feedback>
{/if}
