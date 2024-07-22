<script lang="ts">
	export let size = ''
	export let threshold = ''
</script>

<div class={`l:switcher:${size} th:${threshold}`}>
	<slot />
</div>
