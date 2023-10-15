<script lang="ts">
	export let text = ''
	export let variant = ''
	export let context = '' // code (stacktraces), form (results), dialog (alerts)
	export let action = ''
	// export let show = false

	// $: feedbackClass = show ? 'feedback variant' : 'hide:rm-block'
</script>

{#if context === 'code'}
	<div class={variant} data-test={`feedback-code-${variant}`}>
		<pre>{text}</pre>
	</div>
{:else if context === 'form'}
	<output class={variant} data-test={`feedback-form-${variant}`}>
		{text}
	</output>
{:else if context === 'dialog'}
	<dialog class={variant} data-test={`feedback-dialog-${variant}`}>
		<p>{text}</p>
		<form method="dialog">
			<button>{action}</button>
		</form>
	</dialog>
{/if}
