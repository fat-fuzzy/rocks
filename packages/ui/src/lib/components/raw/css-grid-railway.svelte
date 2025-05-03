<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Prose from '$lib/components/raw/fixtures/prose-short.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'
	import LineShort from '$lib/components/raw/fixtures/line-short.svelte'
	import LineMedium from '$lib/components/raw/fixtures/line-medium.svelte'
	import LineLong from '$lib/components/raw/fixtures/line-long.svelte'
	import LineLongest from '$lib/components/raw/fixtures/line-longest.svelte'

	let title = '🚆 Railway'
	let parent = 'railway'
	let theme = 'blueberry'
	let zone = 'r-zone'
	let size = '2xs'
</script>

<div class={`rails l:grid:${parent} exchange size:${size}`}>
	<header class={`zone:1 l:grid size:${size} surface:1:${theme} dotted`}>
		<MainNav {theme} />
	</header>
	<SideNav
		zone={`zone:2 size:${size}`}
		{theme}
		layout="grid"
		gare="ouest"
		width="full"
		height="sm"
	/>
	<aside class={`l:grid  zone:3 size:${size} `}>
		<AppContext {theme} />
	</aside>
	<div
		class={`l:grid ${zone}:4 size:${size} surface:2:${theme} snap:start align-self:stretch align-content:stretch dotted`}
	>
		<main
			class={`l:grid ${zone}:main size:${size} scroll:y surface:0:${theme}`}
		>
			<div class="page-header l:text:md ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<div class="page-main maki:inline l:stack size:lg">
				<Prose />
				<Details title="Content Details" {theme} layout="grid" gare="nord" />
			</div>
		</main>
		<aside
			class={`l:grid size:${size} page-context surface:1:${theme} scroll:y snap`}
		>
			<nav class="l:stack maki:block">
				<h4 class="maki:inline size:sm">Stopping at:</h4>
				<LineShort />
				<h4 class="maki:inline size:sm">Exchange At:</h4>
				<LineLong />
				<LineMedium />
				<LineLongest />
			</nav>
			<Details title="Page Context" {theme} layout="grid" gare="nord" />
		</aside>
	</div>
	<footer class={`zone:5 l:grid size:${size} surface:3:${theme}`}>
		<Details title="Footer" {theme} layout="grid" gare="nord" surface="4" />
	</footer>
</div>
