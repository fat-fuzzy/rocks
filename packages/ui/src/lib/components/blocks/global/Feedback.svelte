<script lang="ts">
	import type {FeedbackProps, AriaLive} from '$types'
	import {AriaLiveEnum} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		asset = 'default',
		justify = 'start',
		align,
		text,
		context, // feedback context: code, form, dialog,
		status, // feedback color: info, success, warning, error,
		size,
		variant, // feedback variant: default, outline, bare,
		container,
		children,
	}: FeedbackProps = $props()

	let feedbackClasses = $derived(
		styleHelper.getFeedbackStyles(
			{size, asset, variant, align, justify, container},
			status,
			context,
		),
	)
	let ariaLive: AriaLive = $derived(context === 'form' ? AriaLiveEnum.polite : undefined)
</script>

{#if context === 'code'}
	<pre class={feedbackClasses} data-testid={`feedback-${context}`}>{#if children}{@render children()}{:else if text}{text}{/if}</pre>
{:else if context === 'form' || context === 'prose'}
	<div class={feedbackClasses} data-testid={`feedback-${context}`} aria-live={ariaLive}>
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
