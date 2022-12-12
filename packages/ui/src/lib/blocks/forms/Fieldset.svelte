<script lang="ts">
	export let slug = ''
	export let legend = ''
	export let size = 'sm'

	let className = ''

	$: className = `l-stack ${size} `
</script>

<fieldset data-cy={slug} class={className}>
	<legend>{legend}</legend>
	<slot />
</fieldset>
