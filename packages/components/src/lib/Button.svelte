<script>
	let counter = 0;
	$: displayed_count = counter;
</script>

<button on:click={() => counter++}> Click me </button>
<pre>{displayed_count}</pre>
