<script lang="ts">
	export let size = 'md'

	let className = ''

	$: className = `l-wrapper ${size} `
</script>

<div class={className}>
	<slot />
</div>
