<script lang="ts">
	let {theme}: {theme: string} = $props()
</script>

<div class={`app-context surface:3:${theme}`}>
	<p class="maki:inline">App Context</p>
</div>
