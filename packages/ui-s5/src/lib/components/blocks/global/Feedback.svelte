<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {AriaLive} from '$lib/types/index.js'

	type Props = {
		asset: string
		justify?: string
		text?: string
		context: string // feedback context: code, form, dialog, prose
		status: string // feedback color: info, success, warning, error,
		size: string
		variant: string // feedback variant: default, outline, bare,
		container: string
		children: Snippet
	}

	let {
		asset = 'default',
		justify = 'start',
		text,
		context, // feedback context: code, form, dialog,
		status, // feedback color: info, success, warning, error,
		size,
		variant, // feedback variant: default, outline, bare,
		container,
		children,
	}: Props = $props()

	let background = $derived(context === 'code' ? '' : `bg:${status}:100`)
	let containerClass = $derived(container && context !== 'code' ? `l:${container}:${size}` : '')
	let assetClass = $derived(status ? `emoji:${status}` : `emoji:${asset}`)
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let feedbackClass = $derived(`feedback:${context} ${containerClass} ${assetClass} status:${status} font:${size} size:${size} variant:${variant} ${background} ${justifyClass}`)

	let ariaLive: AriaLive = $derived(context === 'form' ? 'polite' : undefined)
</script>

{#if context === 'code'}
	<pre class={feedbackClass} data-testid={`feedback-${context}`}>{#if children}{@render children()}{:else if text}{text}{/if}</pre>
{:else if context === 'form' || context === 'prose'}
	<div class={feedbackClass} data-testid={`feedback-${context}`} aria-live={ariaLive}>
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
