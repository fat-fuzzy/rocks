<script lang="ts">
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'
	import {
		headless,
		tokens,
		blocks,
		layouts,
		recipes,
		graphics,
		api,
		stores,
		constants,
	} from '@fat-fuzzy/ui'

	const {Head} = headless
	const {Collection, Api} = api
	const {Sidebar, RevealAuto} = layouts
	const {DEFAULT_REVEAL_STATE} = constants

	const actionPath = '/ui'
	const title = 'UI' // TODO : Fix title: add breadcrumb nav component ?

	let revealContext = $page.data.context || DEFAULT_REVEAL_STATE

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
		{category: 'graphics', items: graphics},
	]
	const path = $page.url.pathname

	const localStores = [
		stores.ui.reveal.subscribe((value) => {
			if (value) {
				revealContext = value
			}
		}),
	]

	function handleToggle(event: CustomEvent) {
		stores.ui.reveal.set(event.detail)
	}

	$: reveal = revealContext.reveal
	$: markdowns = $page.data.markdowns
	$: content = markdowns.categories.find(({meta}) => meta.slug === 'ui')
	$: headerClass = 'page-header l:switcher:xs bp:xxs bg:polar'
	// TODO: load text content to README.md

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Head page={title} description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="l:main:40 nowrap maki lg">Fat Fuzzy {title}</h1>
	<RevealAuto
		id="ui-app-context"
		size="sm"
		breakpoint="sm"
		color="primary"
		align="start"
		variant="outline"
		title="Context"
		formaction="toggleContext"
		{actionPath}
		{reveal}
		redirect={$page.url.pathname}
		on:toggle={handleToggle}
	>
		<div slot="content" class="l:side shrink ui:menu">
			<Api {path} {actionPath} redirect={$page.url.pathname} />
		</div>
	</RevealAuto>
</header>

<section class="card:md">
	<div class="l:text:lg">{@html content.html}</div>
	{#each components as { category, items }}
		<Collection
			depth={1}
			isPage={false}
			path={`${path}/${category}`}
			components={items}
			{category}
			content={markdowns.categories.find(({meta}) => meta.slug === category)}
			{markdowns}
			{actionPath}
		/>
	{/each}
</section>
