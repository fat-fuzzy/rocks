<script lang="ts">
	import type {Snippet} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import RcScout from '$lib/ui/RcScout.svelte'
	import {page} from '$app/state'

	type Props = {
		actions?: Snippet
	}

	let {actions}: Props = $props()
	let footerClass = 'text:center bg:inherit color:neutral '
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let aboutContainerClass = $derived(pageClass === 'page:home' ? '' : '')
	let footerOpen = $derived(pageClass === 'page:home' ? true : false)
</script>

<footer class={footerClass}>
	<details
		class={`footer-content font:sm ${aboutContainerClass}`}
		open={footerOpen}
	>
		<summary class="raviolink font:heading bg:inherit color:neutral">
			Colophon
		</summary>
		<div class="l:stack:2xl maki:block size:lg">
			<p>
				Made with 🩷 by <a
					href="https://github.com/patiboh"
					target="_blank"
					rel="noopener"
				>
					@patiboh
				</a>
			</p>
			<RcScout />
		</div>
	</details>
	<div class="footer-actions">
		{#if actions}
			{@render actions()}
		{/if}
	</div>
</footer>
