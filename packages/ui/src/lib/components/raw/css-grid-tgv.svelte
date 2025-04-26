<script lang="ts">
	import MainNav from '$lib/components/raw/fixtures/nav-1.svelte'
	import AppContext from '$lib/components/raw/fixtures/app-context.svelte'
	import Details from '$lib/components/raw/fixtures/details.svelte'

	let title = '🚄 TGV'
	let parent = 'tgv'
	let theme = 'neutral'
	let zone = 'g-zone'
</script>

<div class={`l:grid:${parent}`}>
	<header class={`${zone}:1 l:grid surface:1:${theme} dotted`}>
		<MainNav {theme} />
		<AppContext {theme} />
	</header>
	<div
		class={`l:grid ${zone}:2 surface:2:${theme} align-self:stretch align-content:stretch`}
	>
		<main class={`l:grid ${zone}:main surface:1:${theme} text:center`}>
			<div class="page-header ravioli:lg">
				<h1 class={`color:${theme}`}>{title}</h1>
			</div>
			<article class="page-main maki:inline size:lg">
				<ul class="unstyled l:stack:lg">
					<li class="l:frame:video surface:0:neutral dotted font:xl ravioli:xl">
						<p class="l:stack size:2xl emoji:default align:center text:center">
							Welcome to the TGV grid layout!
						</p>
					</li>
					<li class="l:frame:video surface:0:neutral dotted font:xl ravioli:xl">
						<p class="l:stack size:2xl emoji:pause align:center">
							Enjoy a fast and pleasant journey though the page
						</p>
					</li>
					<li class="l:frame:video surface:0:neutral dotted font:xl ravioli:xl">
						<p class="l:stack size:2xl emoji:magic align:center">
							Structure media content on wide sections
						</p>
					</li>
					<li class="l:frame:video surface:0:neutral dotted font:xl ravioli:xl">
						<p class="l:stack size:2xl emoji:wave align:center justify:end">
							Keep it optimized and simple
						</p>
					</li>
					<li class="l:frame:video surface:0:neutral dotted font:xl ravioli:xl">
						<p class="l:stack size:2xl emoji:rainbow align:center justify:end">
							And enjoy the ride!
						</p>
					</li>
				</ul>
			</article>
		</main>
		<footer class={`l:grid ${zone}:footer surface:3:${theme}`}>
			<Details title="Footer" {theme} layout="grid" gare="nord" surface="3" />
		</footer>
	</div>
</div>
