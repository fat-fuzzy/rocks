<script lang="ts">
	export let slug = ''
	export let legend = ''
	export let size = 'sm'
	export let layout = 'stack'
	export let type = ''

	$: className = `l-${layout} ${size} ${type}`
</script>

<fieldset data-cy={slug} class={className}>
	<legend>{legend}</legend>
	<slot />
</fieldset>
