<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Prose from '$lib/components/raw/fixtures/prose-medium.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'
	import LineShort from '$lib/components/raw/fixtures/line-short.svelte'
	import LineMedium from '$lib/components/raw/fixtures/line-medium.svelte'
	import LineLong from '$lib/components/raw/fixtures/line-long.svelte'

	let title = '🚈 Voyager'
	let parent = 'voyager'
	let theme = 'grape'
	let zone = 'v-zone'
</script>

<div class={`rails l:grid:${parent}`}>
	<header class={`${zone}:1 l:grid surface:1:${theme} dotted`}>
		<MainNav {theme} />
	</header>
	<SideNav zone={`${zone}:2`} {theme} layout="grid" gare="nord" />
	<aside class={`l:grid ${zone}:3`}>
		<AppContext {theme} />
	</aside>
	<div class={`l:grid ${zone}:4 scroll:y snap:start`}>
		<main class={`l:grid ${zone}:main scroll:y surface:0:${theme}`}>
			<div class="page-header">
				<div class="l:sidebar:md ravioli:lg">
					<div class="l:main">
						<h1 class={`color:${theme}`}>{title}</h1>
					</div>
					<div class="l:side maki:block l:stack size:md">
						<h4>Stopping at:</h4>
						<LineMedium />
					</div>
				</div>
			</div>
			<div class="l:sidebar size:md">
				<main class="l:main">
					<div class="page-main maki:inline l:stack size:lg">
						<Prose />
						<Details
							title="Content Details"
							{theme}
							layout="grid"
							gare="nord"
						/>
					</div>
				</main>
				<aside
					class={`l:side surface:2:${theme}  maki:block l:grid:auto size:md`}
				>
					<nav class="l:stack size:lg">
						<h4 class="maki:inline size:sm">Exchange At:</h4>
						<LineShort />
						<LineLong />
					</nav>
					<Details title="Page Context" {theme} layout="grid" gare="nord" />
				</aside>
			</div>
		</main>
	</div>
	<footer class={`l:grid ${zone}:5 surface:3:${theme}`}>
		<Details title="Footer" {theme} layout="grid" gare="nord" surface="4" />
	</footer>
</div>
