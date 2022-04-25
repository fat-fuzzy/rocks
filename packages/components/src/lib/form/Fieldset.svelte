<script>
	export let slug = ''
	export let label = ''
	export let size = 'sm'

	let className = ''

	$: className = `fieldset ${size} `
</script>

<fieldset data-cy={slug} class={className}>
	<div class="l-stack">
		<legend>{label}</legend>
		<slot />
	</div>
</fieldset>
