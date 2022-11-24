<script lang="ts">
	export let size = 'md'

	let className = ''

	$: className = `l-switcher ${size} `
</script>

<div class={className}>
	<slot />
</div>
