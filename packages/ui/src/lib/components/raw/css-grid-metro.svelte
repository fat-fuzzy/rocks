<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Prose from '$lib/components/raw/fixtures/prose-long.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'
	import LineShort from '$lib/components/raw/fixtures/line-short.svelte'
	import LineMedium from '$lib/components/raw/fixtures/line-medium.svelte'
	import LineLong from '$lib/components/raw/fixtures/line-long.svelte'

	let title = '🚇 Metro'
	let parent = 'metro'
	let theme = 'apple'
	let zone = 'm-zone'
</script>

<div class={`rails l:grid:${parent}`}>
	<header class={`${zone}:1 l:grid surface:1:${theme} dotted`}>
		<MainNav {theme} />
		<AppContext {theme} />
	</header>
	<SideNav zone={`${zone}:2`} {theme} layout="grid" gare="ouest" />
	<div class={`l:grid ${zone}:3  scroll:y surface:3:${theme} dotted`}>
		<main class={`l:grid ${zone}:main scroll:y surface:0:${theme}`}>
			<div class="page-header l:text:md ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<div class="page-main maki:inline l:stack size:lg">
				<Prose />
				<Details title="Content Details" {theme} layout="grid" gare="nord" />
			</div>
		</main>
		<aside class={`l:grid page-context surface:2:${theme} scroll:y snap`}>
			<nav class="l:stack maki:block">
				<h4 class="maki:inline size:sm">Stopping at:</h4>
				<LineLong />
				<h4 class="maki:inline size:sm">Exchange At:</h4>
				<LineShort />
				<LineMedium />
			</nav>
			<Details title="Page Context" {theme} layout="grid" gare="nord" />
		</aside>
	</div>
	<footer class={`l:grid ${zone}:4`}>
		<Details title="Footer" {theme} layout="grid" gare="nord" surface="4" />
	</footer>
</div>
