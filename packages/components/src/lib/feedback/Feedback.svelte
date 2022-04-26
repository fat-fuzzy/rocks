<script>
	// UI feedback
	export let feedback = ''
	export let show = false

	$: feedbackClass = show ? 'feedback' : 'u-hidden'
</script>

<div class={feedbackClass} data-state="" data-test="feedback">
	<pre class="stacktrace" data-test="stacktrace">{feedback}</pre>
</div>
