<script lang="ts">
	import type {Snippet} from 'svelte'

	type Props = {
		asset: string
		text?: string
		context: string // feedback context: code, form, dialog,
		status: string // feedback color: info, success, warning, error,
		size: string
		variant: string // feedback variant: default, outline, bare,
		container: string
		children: Snippet
	}

	let {
		asset = 'emoji:default',
		text,
		context, // feedback context: code, form, dialog,
		status, // feedback color: info, success, warning, error,
		size,
		variant, // feedback variant: default, outline, bare,
		container,
		children,
	}: Props = $props()

	let background = $derived(context === 'code' ? '' : `bg:${status}:000`)
	let containerClass = $derived(container && context !== 'code' ? `l:${container}:${size}` : '')
	let assetClass = $derived(asset.split(':').length > 1 ? asset : `emoji:${status}`)
	let feedbackClass = $derived(`feedback ${containerClass} ${assetClass} status:${status} font:${size} variant:${variant} ${background}`)
</script>

{#if context === 'code'}
	<pre class={feedbackClass} data-testid={`feedback-${context}`}>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</pre>
{:else if context === 'form'}
	<div class={feedbackClass} data-testid={`feedback-${context}`}>
		{#if status !== 'default'}
			<p class="status">{status}</p>
		{/if}
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</div>
{/if}
