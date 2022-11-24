<script lang="ts">
	export let size = 'sm'

	let className = ''

	$: className = `l-stack ${size} `
</script>

<div class={className}>
	<slot />
</div>
