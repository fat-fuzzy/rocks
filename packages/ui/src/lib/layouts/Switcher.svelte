<script lang="ts">
	export let size = 'md'
	export let breakpoint = 'bp:md'
</script>

<div class={`l-switcher ${size} ${breakpoint}`}>
	<slot />
</div>
