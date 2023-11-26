<script lang="ts">
	import {page} from '$app/stores'
	import {onDestroy} from 'svelte'

	import {tokens, blocks, compositions, layouts, api, stores} from '$lib'
	const {Collection, Api} = api
	const {RevealAuto} = layouts

	let stylesApi = api.stylesApi.initStyles()

	function getComponentType(cat: string) {
		switch (cat) {
			case 'tokens':
				return tokens
			case 'blocks':
				return blocks
			case 'layouts':
				return layouts
			case 'compositions':
				return compositions
			default:
				return {}
		}
	}

	const localStores = [
		stores.ui.styles.subscribe((value) => {
			if (value) {
				stylesApi.applyStyles(value)
			}
		}),
	]

	$: category = $page.params.category
	$: markdowns = $page.data.markdowns
	$: content = markdowns.categories.find(({meta}) => meta.slug === category)
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = getComponentType(category)
	$: path = $page.url.pathname
	$: headerClass = 'page-header l:switcher:xs bp:xxs bg:polar'

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class={headerClass}>
	<h1 class="l:main:40 card:xl">{title}</h1>
	<RevealAuto
		size="sm"
		threshold="sm"
		color="primary:light"
		align="start"
		asset="&nbsp;☂️&nbsp;"
		title="Context"
	>
		<div slot="content" class="l:side ui:menu reverse">
			<Api {title} {path} />
		</div>
	</RevealAuto>
</header>

<Collection {title} depth={1} isPage={true} {components} {path} {category} {content} {stylesApi} />
