<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	import RcScout from '$lib/ui/RcScout.svelte'
	import {page} from '$app/state'

	let footerClass = ''
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let aboutContainerClass = $derived(pageClass === 'page:home' ? '' : '')
	let footerOpen = $derived(pageClass === 'page:home' ? true : false)
</script>

<footer class={footerClass}>
	<details
		class={`l:burrito:3xl font:md maki:block:2xl ${aboutContainerClass}`}
		open={footerOpen}
	>
		<summary class="ravioli:3xs font:heading color:primary variant:bare">
			About
		</summary>
		<div class="l:stack:2xl">
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
