<script lang="ts">
	let {theme}: {theme: string} = $props()
</script>

<div
	class={`app-context l:flex align:center justify:center  surface:2:${theme}`}
>
	<p class="maki:inline">Context</p>
</div>
