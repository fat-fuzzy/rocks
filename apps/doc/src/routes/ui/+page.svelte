<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts, api} from '@fat-fuzzy/ui'

	const {Collection, Api} = api
	const {Sidebar} = layouts

	let title = 'Fat Fuzzy UI' // TODO : Fix title: add breadcrumb nav component ?

	const components = [
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
	]
	let path = $page.url.pathname

	// TODO: load text content to README.md
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<Sidebar size="xs" align="end">
	<section slot="main" class="l:stack lg">
		<p>
			Fat Fuzzy UI is a design guide and component library and that aims to maximize use HTML and
			CSS's native capabilities to produce harmonious and robust designs.
		</p>
		<p>
			The components are built using <a href="https://svelte.dev" target="_blank" rel="noreferrer">
				Svelte
			</a>
			and <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer"> SvelteKit </a>, and
			the structure of the library as well as the way the components are designed are based on the
			ideas put forth in
			<a href="https://every-layout.dev/blog/algorithmic-design/" target="_blank" rel="noreferrer">
				Algorithmic Design
			</a>
			and <a href="https://cube.fyi/" target="_blank" rel="noreferrer">CUBE CSS</a>.
		</p>
		<p>
			🚧 The library as well as its documentation are still a work in progress and under active
			development.
		</p>
		<p>Thank you for your patience! ❤️</p>
		{#each components as { category, items }}
			<Collection
				{title}
				depth="1"
				isPage={false}
				path={`${path}/${category}`}
				components={items}
				{category}
			/>
		{/each}
	</section>
</Sidebar>
