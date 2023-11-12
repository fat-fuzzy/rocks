<script lang="ts">
	import {page} from '$app/stores'
	import {tokens, blocks, compositions, layouts, api} from '@fat-fuzzy/ui'
	const {Collection, Api} = api

	let {RevealAuto} = layouts

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

	$: category = $page.params.category
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = getComponentType(category)
	$: path = $page.url.pathname
	$: headerClass = 'page-header layer:reveal l:switcher:xs bp:xxs bg:polar'
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
		direction="reverse"
	>
		<div slot="content" class="l:side ui:menu l:switcher:sm reverse">
			<Api category="app" {title} />
		</div>
	</RevealAuto>
</header>

<Collection {title} depth={1} isPage={true} {components} {path} {category} />
