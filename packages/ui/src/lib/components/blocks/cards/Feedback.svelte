<script lang="ts">
	export let text = ''
	export let variant = ''
	export let color = ''
	export let background = ''
	export let size = ''
	export let context = '' // code (stacktraces), form (results), dialog (alerts)
	export let action = 'ok'

	$: feedbackClass = `card:${size} ${variant} ${context} ${color} bg:${background}`
</script>

{#if context === 'code'}
	<div class={feedbackClass} data-test={`feedback-${context}-${variant}`}>
		<pre>{text}</pre>
	</div>
{:else if context === 'form'}
	<output class={feedbackClass} data-test={`feedback-${context}-${variant}`}>
		{text}
	</output>
{:else if context === 'dialog'}
	<dialog class={feedbackClass} data-test={`feedback-${context}-${variant}`}>
		<p>{text}</p>
		<form method="dialog">
			<button>{action}</button>
		</form>
	</dialog>
{/if}
