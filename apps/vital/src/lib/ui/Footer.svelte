<script lang="ts">
	import type {Snippet} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'

	type Props = {
		socials?: Snippet
		// actions?: Snippet
		children?: Snippet
	}

	let {socials, children}: Props = $props()
	let footerClass = 'text:center bg:inherit color:neutral '
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let aboutContainerClass = $derived(pageClass === 'page:home' ? '' : '')
</script>

<footer class={footerClass}>
	{#if children}
		<div class="footer-content l:flex justify:center">
			{@render children()}
		</div>
	{:else}
		<div class={`footer-content font:sm justify:center${aboutContainerClass}`}>
			{#if socials}
				{@render socials()}
			{/if}
		</div>
	{/if}
</footer>
