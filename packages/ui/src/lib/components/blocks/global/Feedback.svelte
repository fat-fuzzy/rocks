<script lang="ts">
	import format from '$lib/utils/format.js'
	export let text = ''
	export let asset = ''
	export let context = '' // feedback context: code, form, dialog
	export let status = '' // feedback color: info, success, warning, error
	export let size = ''
	export let variant = 'outline' // feedback variant: default, outline, bare
	export let container = 'card'

	$: background = context === 'code' ? '' : `bg:${status}:lighter`
	$: feedbackClass = `feedback ${container}:${size} ${variant}:${status} ${background}`
</script>

{#if context === 'code'}
	<pre class={feedbackClass} data-test={`feedback-${context}`}>{format.formatLabel(
			text,
			asset,
		)}</pre>
{:else if context === 'form'}
	<p class={feedbackClass} data-test={`feedback-${context}`}>
		{format.formatLabel(text, asset)}
	</p>
{/if}
