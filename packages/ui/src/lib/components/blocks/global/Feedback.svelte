<script lang="ts">
	import type {FeedbackProps, AriaLive, UiStatus, UiTextContext} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'Feedback',
		asset = 'default',
		element = 'div',
		title,
		text,
		status,
		context,
		shape = 'mellow',
		align = 'baseline',
		justify = 'start',
		size,
		font,
		variant,
		layer,
		container = 'raviolink ',
		children,
	}: FeedbackProps = $props()

	let feedbackClasses = $derived(
		styleHelper.getFeedbackStyles(
			{
				size,
				font,
				asset,
				shape,
				variant,
				layer,
				align,
				justify,
				container,
			},
			status as UiStatus,
			context as UiTextContext,
		),
	)
	let ariaLive: AriaLive = $derived(context === 'form' ? 'polite' : undefined)
	let testId = $derived(id === 'Feedback' ? id : `Feedback-${id}`)
	let textAlign = $derived(
		shape === 'round' || shape === 'square' || shape === 'pill'
			? 'text:center'
			: '',
	)
	let ravioli = $derived(
		shape === 'round' || shape === 'square' || shape === 'pill'
			? `ravioli:${size}`
			: '',
	)
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
		{id}
		class={feedbackClasses}
		data-testid={testId}>{#if children}{@render children()}{:else if text}{text}{/if}</pre>
{:else if context === 'form' || context === 'prose'}
	<svelte:element
		this={element}
		{id}
		class={feedbackClasses}
		data-testid={testId}
		aria-live={ariaLive}
	>
		{#if feedbackTitle}
			<p class={`status ${textAlign}`}>{feedbackTitle}</p>
		{/if}
		<div class={`message ${ravioli} ${textAlign}`}>
			{#if children}
				{@render children()}
			{:else if text}
				<p>{text}</p>
			{/if}
		</div>
	</svelte:element>
{/if}
