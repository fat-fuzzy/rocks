<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Gallery from '$lib/components/raw/fixtures/gallery.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'

	let title = '🚋 Tram'
	let parent = 'tram'
	let theme = 'lime'
	let zone = 't-zone'
	let size = '2xs'
</script>

<div class={`rails l:grid:${parent} size:${size}`}>
	<header class={`zone:1 l:grid size:${size} surface:1:${theme} dotted`}>
		<MainNav {theme} />
	</header>

	<SideNav
		zone={`zone:2 size:${size}`}
		{theme}
		layout="grid"
		gare="ouest"
		width="md hug"
		height="sm"
	/>

	<aside class={`zone:3 l:grid size:3xs surface:1:${theme}`}>
		<AppContext {theme} />
	</aside>

	<div class={`${zone}:4 l:grid size:${size} scroll:y surface:3:${theme}`}>
		<main
			class={`${zone}:main l:grid size:${size} scroll:y surface:0:${theme}`}
		>
			<div class="page-header l:text:md ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<div class="page-main maki:inline size:lg l:stack size:lg">
				<Gallery id="creatures" {theme} />
				<Gallery id="halloween" theme="tangerine" />
			</div>
		</main>
		<aside
			class={`l:grid page-context size:${size} scroll:y surface:0:${theme}`}
		>
			<div class="l:stack maki:inline size:md">
				<h4 class="maki:block">Tours:</h4>
				<ul class="unstyled l:stack size:md">
					<li class="ellipsis snap:center">
						<a href="#section-creatures" class="raviolink">Creatures</a>
					</li>
					<li class="ellipsis snap:center">
						<a href="#section-halloween" class="raviolink">Halloween</a>
					</li>
				</ul>
			</div>
		</aside>
	</div>
	<footer class={`zone:5 l:grid size:${size}`}>
		<Details title="Footer" {theme} layout="grid" gare="nord" surface="4" />
	</footer>
</div>
