<script lang="ts">
	export let size = 'md'
</script>

<div class={`l:burrito:${size}`}>
	<slot name="content" />
</div>
