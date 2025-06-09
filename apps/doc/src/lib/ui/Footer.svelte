<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	import RcScout from '$lib/ui/RcScout.svelte'
	import {page} from '$app/state'

	let footerClass = 'text:center bg:inherit'
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let aboutContainerClass = $derived(pageClass === 'page:home' ? '' : '')
	// let footerOpen = $derived(pageClass === 'page:home' ? true : false)
	let footerOpen = $derived(false)
</script>

<footer class={footerClass}>
	<details class={`font:sm ${aboutContainerClass}`} open={footerOpen}>
		<summary class="raviolink font:heading bg:inherit color:neutral">
			About
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
</footer>
