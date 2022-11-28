<script lang="ts">
	export let size = 'md'

	let className = ''

	$: className = `l-burrito ${size} `
</script>

<div class={className}>
	<slot />
</div>
