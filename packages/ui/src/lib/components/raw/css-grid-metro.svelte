<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Prose from '$lib/components/raw/fixtures/prose-longest.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'
	import LineShort from '$lib/components/raw/fixtures/line-short.svelte'
	import LineMedium from '$lib/components/raw/fixtures/line-medium.svelte'
	import LineLong from '$lib/components/raw/fixtures/line-long.svelte'
	import LineLongest from '$lib/components/raw/fixtures/line-longest.svelte'

	let title = '🚇 Metro'
	let parent = 'metro'
	let theme = 'litchee'
	let size = '2xs'
</script>

<div class={`l:grid:urbanist ${parent} swap size:${size}`}>
	<header
		class={`zone:1 exchange l:grid size:${size} surface:1:${theme} dotted`}
	>
		<MainNav {theme} />
		<SideNav
			zone={`sidebar size:${size}`}
			{theme}
			layout="grid"
			gare="ouest"
			width="md"
			height="lg"
			{size}
		/>
		<aside class={`context l:grid size:3xs surface:1:${theme}`}>
			<AppContext {theme} />
		</aside>
	</header>
	<div class={`zone:2 ${parent} l:grid size:${size} hug`}>
		<main
			class={`zone:main ${parent} l:grid size:${size} scroll:y surface:0:${theme}`}
		>
			<div class="page-header l:text:md ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<div class="page-main maki:inline l:stack:lg">
				<Prose />
				<Details title="Content Details" {theme} layout="grid" gare="nord" />
			</div>
		</main>
		<aside
			class={`l:grid size:${size} page-context surface:2:${theme} scroll:y snap`}
		>
			<nav class="l:stack maki:block">
				<h4 class="maki:inline size:sm">Stopping at:</h4>
				<LineLongest />
				<h4 class="maki:inline size:sm">Exchange At</h4>
				<LineLong />
				<LineShort />
				<LineMedium />
			</nav>
			<Details title="Page Context" {theme} layout="grid" gare="nord" />
		</aside>
	</div>
	<div class={`zone:3 ${parent} l:grid size:${size}`}>
		<footer class={`l:grid size:${size} `}>
			<Details
				title="Footer"
				{theme}
				zone="footer-content"
				layout="grid"
				gare="nord"
				surface="4"
				height="md"
			/>
		</footer>
	</div>
</div>
