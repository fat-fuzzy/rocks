<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'

	let title = '🚄 TGV'
	let parent = 'tgv'
	let theme = 'neutral'
	let size = '2xs'
</script>

<div class={`rails l:grid:${parent} size:${size}`}>
	<header class={`zone:1 l:grid surface:1:${theme} dotted`}>
		<MainNav {theme} />
	</header>
	<div class="zone:2 l:grid size:3xs surface:1:neutral">
		<div class="app-name l:flex align:center">
			<p class="maki:inline font:heading">Grid Tgv</p>
		</div>
	</div>
	<aside class={`zone:3 l:grid size:3xs surface:1:${theme}`}>
		<AppContext {theme} />
	</aside>
	<div class={`zone:4 scroll:y`}>
		<main class={`zone:main surface:1:${theme} text:center`}>
			<div class="page-header ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<article class="page-main maki:inline size:lg">
				<ul class="unstyled l:stack:lg">
					<li
						class={`l:frame:video surface:0:${theme} dotted font:xl ravioli:xl`}
					>
						<p class="l:stack size:2xl emoji:default align:center text:center">
							Welcome to the TGV grid layout!
						</p>
					</li>
					<li
						class={`l:frame:video surface:0:${theme} dotted font:xl ravioli:xl`}
					>
						<p class="l:stack size:2xl emoji:pause align:center">
							Enjoy a fast and pleasant journey though the page
						</p>
					</li>
					<li
						class={`l:frame:video surface:0:${theme} dotted font:xl ravioli:xl`}
					>
						<p class="l:stack size:2xl emoji:magic align:center">
							Structure media content on wide sections
						</p>
					</li>
					<li
						class={`l:frame:video surface:0:${theme} dotted font:xl ravioli:xl`}
					>
						<p class="l:stack size:2xl emoji:wave align:center justify:end">
							Keep it optimized and simple
						</p>
					</li>
					<li
						class={`l:frame:video surface:0:${theme} dotted font:xl ravioli:xl`}
					>
						<p class="l:stack size:2xl emoji:rainbow align:center justify:end">
							And enjoy the ride!
						</p>
					</li>
				</ul>
			</article>
		</main>
	</div>
	<footer class={`zone:5 l:grid size:${size} surface:4:${theme}`}>
		<Details title="Footer" {theme} layout="grid" gare="nord" surface="4" />
	</footer>
</div>
