<script lang="ts">
	import {blocks, stories} from '@fat-fuzzy/ui'
	const {Story} = stories

	let title = 'Fat Fuzzy UI'
	const components = blocks

	// TODO : move to store : see also in other templates
	let initial = {
		theme: {light: 'day', contrast: 'contrast'},
		variant: '',
		size: 'md',
		color: 'primary',
		layout: 'switcher',
		// app: 'ui', // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component context): maybe: use web components ?
		icon: '✨',
	}

	$: keys = Object.keys(components)
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<section class="l-text:xl l-stack">
	<h2>Blocks</h2>
	{#each keys as key}
		{@const Component = components[key]}
		<Story title={key} slug={key.toLowerCase()} component={Component} {initial} />
	{/each}
</section>
