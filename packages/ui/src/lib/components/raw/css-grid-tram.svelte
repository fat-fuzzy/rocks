<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import SideNav from '$lib/components/raw/fixtures/nav-2.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Gallery from '$lib/components/raw/fixtures/gallery.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'

	let title = '🚋 Tram'
	let parent = 'tram'
	let theme = 'lime'
	let size = '2xs'
</script>

<div class={`l:grid:urbanist ${parent} size:${size}`}>
	<header
		class={`zone:1 exchange swap l:grid size:${size} surface:1:${theme} dotted`}
	>
		<MainNav {theme} />

		<SideNav
			zone={`sidebar size:${size}`}
			{theme}
			layout="grid"
			gare="ouest"
			width="md hug"
			height="sm"
		/>

		<aside class={`context l:grid size:3xs surface:1:${theme}`}>
			<AppContext {theme} />
		</aside>
	</header>

	<div
		class={`zone:2 ${parent} hug l:grid size:${size} scroll:y surface:0:${theme}`}
	>
		<main class={`zone:main ${parent} scroll:y surface:0:${theme} snap:start`}>
			<div class="page-header l:text:md ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<div class="page-main maki:inline size:lg l:stack:lg">
				<Gallery id="creatures" {theme} />
				<Gallery id="halloween" theme="tangerine" />
			</div>
		</main>
		<aside
			class={`l:grid page-context size:${size} scroll:y surface:0:${theme}`}
		>
			<div class="l:stack maki:inline size:md">
				<h4 class="maki:block">Tours:</h4>
				<ul class="unstyled l:stack:md">
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
