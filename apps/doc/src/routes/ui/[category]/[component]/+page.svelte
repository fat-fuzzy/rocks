<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import {stories} from '@fat-fuzzy/ui'
	const {Story} = stories

	let title: string
	let Component: ComponentType

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

	$: title = $page.data.title
	$: slug = $page.data.slug
	$: Component = $page.data.Component
</script>

<header class="header-page">
	<h1>{title}</h1>
</header>

<Story {slug} showOptions={true} component={Component} {initial} />
