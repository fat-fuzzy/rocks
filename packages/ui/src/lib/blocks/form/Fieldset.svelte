<script lang="ts">
	export let slug = ''
	export let label = ''
	export let size = 'sm'

	let className = ''

	$: className = `l-stack ${size} `
</script>

<fieldset data-cy={slug} class={className}>
	<legend>{label}</legend>
	<slot />
</fieldset>
