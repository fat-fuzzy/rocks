<script lang="ts">
	import type {FeedbackProps} from '$types'
	import {onMount} from 'svelte'
	import toastChef from '$lib/components/blocks/overlays/Toast/actor.svelte'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	const {
		id,
		context = 'prose',
		status = 'default',
		...props
	}: Partial<FeedbackProps> & {id: string} = $props()

	let ref: HTMLOutputElement

	onMount(async () => {
		toastChef.cookToast(id as string, ref)
	})
</script>

<output aria-live="polite" class="toast" bind:this={ref}>
	<Feedback {id} {context} {status} {...props}>
		{#if props.children}
			{@render props.children()}
		{:else if props.text}
			<p>{props.text}</p>
		{/if}
	</Feedback>
</output>
