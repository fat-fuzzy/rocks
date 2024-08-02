<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {AriaLive} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	type Props = {
		asset?: string
		align?: string
		justify?: string
		text?: string
		context: UiTextContext // feedback context: code, form, dialog, prose
		status: UiStatus // feedback color: info, success, warning, error,
		size?: string
		variant?: string // feedback variant: default, outline, bare,
		container?: string
		children: Snippet
	}

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
	}: Props = $props()

	let feedbackClasses = $derived(
		styleHelper.getFeedbackStyles(
			{size, asset, variant, align, justify, container},
			status,
			context,
		),
	)
	let ariaLive: AriaLive = $derived(context === 'form' ? 'polite' : undefined)
</script>

{#if context === 'code'}
	<pre class={feedbackClasses} data-testid={`feedback-${context}`}>{#if children}{@render children()}{:else if text}{text}{/if}</pre>
{:else if context === 'form' || context === 'prose'}
	<div class={feedbackClasses} data-testid={`feedback-${context}`} aria-live={ariaLive}>
		{#if status !== 'default'}
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
