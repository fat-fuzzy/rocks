<script lang="ts">
	export let breakpoint = ''
</script>

<div class={`l:switcher bp:${breakpoint}`}>
	<slot />
</div>
