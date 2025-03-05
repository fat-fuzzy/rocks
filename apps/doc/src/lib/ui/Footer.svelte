<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	import RcScout from '$lib/ui/RcScout.svelte'
	import {page} from '$app/state'

	let footerClass = 'ravioli:xs'
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let aboutContainerClass = $derived(
		pageClass === 'page:home' ? 'ravioli:xl' : '',
	)
	let footerOpen = $derived(pageClass === 'page:home' ? true : false)
</script>

<footer class={footerClass}>
	<details
		class={`l:burrito:3xl color:neutral font:md maki:block:xl ${aboutContainerClass}`}
		open={footerOpen}
	>
		<summary class="ravioli:2xs">About</summary>
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
