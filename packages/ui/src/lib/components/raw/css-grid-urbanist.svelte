<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Prose from '$lib/components/raw/fixtures/prose-long.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'
	import LineShort from '$lib/components/raw/fixtures/line-short.svelte'
	import LineMedium from '$lib/components/raw/fixtures/line-medium.svelte'
	import LineLong from '$lib/components/raw/fixtures/line-long.svelte'
	import LineLongest from '$lib/components/raw/fixtures/line-longest.svelte'

	let title = '🚉 Urbanist'
	let parent = 'urbanist'
	let theme = 'accent'
	let size = '2xs'
</script>

<div class={`l:grid:urbanist ${parent} size:${size}`}>
	<header
		class={`zone:1 exchange l:grid size:${size} surface:1:${theme} dotted`}
	>
		<MainNav {theme} />

		<SideNav
			zone={`sidebar size:${size}`}
			{theme}
			layout="grid"
			gare="ouest"
			width="lg"
			height="sm"
			{size}
		/>

		<aside class={`context l:grid size:${size}`}>
			<AppContext {theme} />
		</aside>
	</header>

	<div class={`zone:2 ${parent} hug size:${size} scroll:y snap:start`}>
		<main class={`zone:main ${parent}  scroll:y surface:0:${theme}`}>
			<header class="page-header l:sidebar size:md">
				<div class="l:main">
					<h1 class={`color:${theme} l:text:md maki:inline maki:block size:lg`}>
						{title}
					</h1>
				</div>
				<div class="l:side maki:block l:stack:md">
					<h3>Stopping at:</h3>
					<LineLong />
				</div>
			</header>
			<div class="page-main l:sidebar size:md">
				<div class="l:main">
					<div class="l:text:md maki:inline size:lg">
						<h2>
							A Huge Ever Growing Pulsating Brain That Rules from the Centre of
							the Ultraworld
						</h2>
						<h3>Artist: The Orb</h3>
					</div>
					<div class="maki:inline l:stack:lg">
						<Prose />
						<Details
							title="Content Details"
							{theme}
							layout="grid"
							gare="nord"
						/>
					</div>
				</div>

				<aside
					class={`l:side surface:2:${theme} maki:block l:grid:auto size:md`}
				>
					<nav class="l:stack:lg">
						<h4 class="maki:inline size:sm">Exchange At</h4>
						<LineShort />
						<LineMedium />
						<LineLongest />
					</nav>
					<Details title="Page Context" {theme} layout="grid" gare="nord" />
				</aside>
			</div>
		</main>
	</div>

	<div class={`zone:3 ${parent} l:grid size:${size}`}>
		<footer class={`l:grid size:${size} `}>
			<Details
				title="Footer"
				zone="footer-content"
				{theme}
				layout="grid"
				gare="nord"
				surface="4"
				height="md"
			/>
		</footer>
	</div>
</div>
