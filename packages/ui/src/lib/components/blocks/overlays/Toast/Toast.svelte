<script lang="ts">
	import type {FeedbackProps} from '$types'
	import {onMount} from 'svelte'
	import toaster from '$lib/components/blocks/overlays/Toast/actor.svelte'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	const {
		id,
		context = 'prose',
		status = 'default',
		text,
		children,
	}: Partial<FeedbackProps> & {id: string} = $props()

	let toast: HTMLOutputElement

	onMount(() => {
		toaster.cookToast(id as string, toast)
	})
</script>

<output {id} aria-live="polite" class="toast" bind:this={toast}>
	<Feedback {context} {status} font="sm">
		{#if children}
			{@render children()}
		{:else if text}
			<p>{text}</p>
		{/if}
	</Feedback>
</output>
