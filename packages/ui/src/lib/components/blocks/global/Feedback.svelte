<script lang="ts">
	export let text = ''
	export let asset = 'emoji:default'
	export let context = '' // feedback context: code, form, dialog
	export let status = 'default' // feedback color: info, success, warning, error
	export let size = ''
	export let variant = 'outline' // feedback variant: default, outline, bare
	export let container = 'card'

	$: background = context === 'code' ? '' : `bg:${status}:lighter`
	$: feedbackClass = `feedback ${container}:${size} ${asset} ${status} font:${size} ${variant} ${background}`
</script>

{#if context === 'code'}
	<pre class={feedbackClass} data-test={`feedback-${context}`}>{text}</pre>
{:else if context === 'form'}
	<p class={feedbackClass} data-test={`feedback-${context}`}>
		{text}
	</p>
{/if}
