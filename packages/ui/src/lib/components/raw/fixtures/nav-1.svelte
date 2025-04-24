<script lang="ts">
	let {theme}: {theme: string} = $props()
</script>

<div class={`navbar surface:3:${theme}`}>
	<nav id="nav-1" class="l:flex" aria-label="Main navigation">
		<p class="maki:inline">Nav 1</p>
		<a href="./" title="CSS Tests">🧪</a>
	</nav>
</div>
