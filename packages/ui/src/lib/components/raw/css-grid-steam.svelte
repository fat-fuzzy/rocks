<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import NavItems from '$lib/components/raw/fixtures/nav-2-emojis.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'

	let title = '🚂 Steam'
	let parent = 'steam'
	let theme = 'mora'
	let zone = 's-zone'
	let size = '2xs'
</script>

<div class={`rails l:grid:${parent} size:${size}`}>
	<header class={`${zone}:1 l:grid size:${size} surface:1:${theme} dotted`}>
		<MainNav {theme} />
	</header>
	<SideNav
		zone={`zone:2 size:${size}`}
		{theme}
		layout="grid"
		gare="ouest"
		width="lg hug"
		height="sm"
	>
		<NavItems />
	</SideNav>
	<aside class={`zone:3 l:grid size:3xs surface:1:${theme}`}>
		<AppContext {theme} />
	</aside>
	<div class={`${zone}:4 l:grid surface:2:${theme} scroll:y snap:start`}>
		<main class={`${zone}:main l:grid  scroll:y surface:0:${theme}`}>
			<div class="page-header l:text:md ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<div class="page-main l:flex justify:center">
				<div
					class="l:frame:video justify:center surface:0:primary dotted font:2xl w:full"
				>
					<p class="emoji:sparkles text:center justify:end">
						Add your
						<span>interactive content </span>
						<span>here</span>
					</p>
				</div>
				<Details
					title="Content Details"
					{theme}
					layout="grid w:full"
					gare="nord"
				/>
			</div>
		</main>
		<aside class={`l:grid page-context surface:1:${theme} scroll:y snap`}>
			<Details title="Interaction Controls" {theme} layout="grid" gare="nord" />
		</aside>
	</div>
	<footer class={`zone:5 l:grid `}>
		<Details title="Footer" {theme} layout="grid" gare="nord" surface="4" />
	</footer>
</div>
