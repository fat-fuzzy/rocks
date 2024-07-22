<script lang="ts">
	export let areas = ''

	$: classes = areas ? `l:grid:areas:${areas}` : 'l:grid'
</script>

<div class={classes}>
	<aside class="navs">
		<slot name="navs" />
	</aside>
	<header class="header">
		<slot name="header" />
	</header>
	<article class="content">
		<slot name="content" />
	</article>
	<aside class="actions">
		<slot name="actions" />
	</aside>
	<footer class="footer">
		<slot name="footer" />
	</footer>
</div>
