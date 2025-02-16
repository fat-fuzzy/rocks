<script lang="ts">
	import type {FeedbackProps, AriaLive, UiStatus, UiTextContext} from '$types'
	import {AriaLiveEnum} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		asset = 'default',
		justify = 'start',
		align,
		text,
		context,
		status,
		size,
		variant,
		container,
		children,
	}: FeedbackProps = $props()

	let feedbackClasses = styleHelper.getFeedbackStyles(
		{size, asset, variant, align, justify, container},
		status as UiStatus,
		context as UiTextContext,
	)
	let ariaLive: AriaLive = $derived(
		context === 'form' ? AriaLiveEnum.polite : undefined,
	)
</script>

{#if context === 'code'}
	<pre
		class={feedbackClasses}
		data-testid="Feedback">{#if children}{@render children()}{:else if text}{text}{/if}</pre>
{:else if context === 'form' || context === 'prose'}
	<div class={feedbackClasses} data-testid="Feedback" aria-live={ariaLive}>
		{#if context === 'prose' && status !== 'default'}
			<p class="status">{status}</p>
		{/if}
		<div class="message">
			{#if children}
				{@render children()}
			{:else if text}
				<p>{text}</p>
			{/if}
		</div>
	</div>
{/if}
