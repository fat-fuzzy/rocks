<script lang="ts">
	export let size = ''
	export let breakpoint = ''
</script>

<div class={`l-switcher ${size} bp:${breakpoint}`}>
	<slot />
</div>
