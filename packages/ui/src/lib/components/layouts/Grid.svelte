<script lang="ts">
	import type { GridLayoutProps } from "./layout.types.js"

	let {areas = 'md',flex,  navs, header, content, actions, footer}: GridLayoutProps = $props()

	let gridClass = flex ? 'l:flex:grid' :'l:grid'
	let classes = $derived(areas ? `${gridClass}:areas:${areas}` : gridClass)
</script>

<div class={classes}>
	<aside class="navs">
		{#if navs}
			{@render navs()}
		{/if}
	</aside>
	<header class="header">
		{#if header}
			{@render header()}
		{/if}
	</header>
	<article class="content">
		{#if content}
			{@render content()}
		{/if}
	</article>
	<aside class="actions">
		{#if actions}
			{@render actions()}
		{/if}
	</aside>
	<footer class="footer">
		{#if footer}
			{@render footer()}
		{/if}
	</footer>
</div>
