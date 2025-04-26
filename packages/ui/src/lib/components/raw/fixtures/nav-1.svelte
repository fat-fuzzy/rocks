<script lang="ts">
	let {theme}: {theme: string} = $props()
</script>

<div class={`navbar l:flex align:center justify:center   surface:4:${theme}`}>
	<nav
		id="nav-1"
		class="l:flex align:center justify:center nowrap"
		aria-label="Main navigation"
	>
		<p class="maki:inline">Nav 1</p>
		<a href="./" title="CSS Tests">🧪</a>
	</nav>
</div>
