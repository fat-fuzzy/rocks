<script lang="ts">
	import {blocks, stories} from '@fat-fuzzy/ui'
	const {Story} = stories

	const components = blocks

	// TODO : move to store : see also in other templates
	let initial = {
		variant: '',
		size: 'md',
		color: 'primary',
		theme: 'light',
		layout: 'switcher',
		// app: 'ui', // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component context): maybe: use web components ?
		icon: '✨',
	}

	$: keys = Object.keys(components)
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy UI Library documentation" />
</svelte:head>

<header class="header-page">
	<h1>Fat Fuzzy UI</h1>
</header>

{#each keys as key}
	{@const Component = components[key]}
	<Story title={key} slug={key.toLowerCase()} component={Component} {initial} />
{/each}
