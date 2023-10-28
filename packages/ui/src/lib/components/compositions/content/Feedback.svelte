<script lang="ts">
	export let text = ''
	export let context = '' // feedback context: code, form, dialog
	export let status = '' // feedback color: neutral, tip, success, warning, error
	export let background = ''
	export let size = ''
	export let action = 'ok'

	$: feedbackClass = `card:${size} ${context} ${status} bg:${background}`
</script>

{#if context === 'code'}
	<div class={feedbackClass} data-test={`feedback-${context}`}>
		<pre>{text}</pre>
	</div>
{:else if context === 'form'}
	<output class={feedbackClass} data-test={`feedback-${context}`}>
		{text}
	</output>
{:else if context === 'dialog'}
	<dialog class={feedbackClass} data-test={`feedback-${context}`}>
		<p>{text}</p>
		<form method="dialog">
			<button>{action}</button>
		</form>
	</dialog>
{/if}
