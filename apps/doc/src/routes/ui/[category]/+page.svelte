<script lang="ts">
	import {page} from '$app/stores'
	import {tokens, blocks, compositions, layouts, api} from '@fat-fuzzy/ui'
	const {Collection, Api} = api

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
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="bg:polar l:sidebar page-header">
	<h1 class="l:main:50 card:xl">{title}</h1>
	<div class="l:side card:sm l:flex reverse">
		<Api category="app" {title} />
	</div>
</header>

<Collection {title} depth={1} isPage={true} {components} {path} {category} />
