<script lang="ts">
	import type {FeedbackProps, AriaLive, UiStatus, UiTextContext} from '$types'
	import {AriaLiveEnum} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'Feedback',
		asset = 'default',
		title,
		text,
		status,
		context,
		shape = 'mellow',
		align,
		justify = 'start',
		size,
		font,
		variant,
		layer,
		container,
		children,
	}: FeedbackProps = $props()

	let feedbackClasses = $derived(
		styleHelper.getFeedbackStyles(
			{size, font, asset, variant, layer, align, justify, container},
			status as UiStatus,
			context as UiTextContext,
		),
	)
	let ariaLive: AriaLive = $derived(
		context === 'form' ? AriaLiveEnum.polite : undefined,
	)
	let testId = $derived(id === 'Feedback' ? id : `Feedback-${id}`)
	let feedbackTitle = $derived(
		title
			? title
			: context === 'prose' && status !== 'default'
				? status
				: undefined,
	)
</script>

{#if context === 'code'}
	<pre
		class={`${feedbackClasses} shape:${shape}`}
		data-testid={testId}>{#if children}{@render children()}{:else if text}{text}{/if}</pre>
{:else if context === 'form' || context === 'prose'}
	<ff-feedback
		class={`${feedbackClasses} shape:${shape}`}
		data-testid={testId}
		aria-live={ariaLive}
	>
		{#if feedbackTitle}
			<p class="status">{feedbackTitle}</p>
		{/if}
		<div class={`message shape:${shape}`}>
			{#if children}
				{@render children()}
			{:else if text}
				<p>{text}</p>
			{/if}
		</div>
	</ff-feedback>
{/if}
