<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import {stories} from '@fat-fuzzy/ui'
	const {Story} = stories

	let title: string
	let Component: ComponentType

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

	$: title = $page.data.title
	$: slug = $page.data.slug
	$: Component = $page.data.Component
</script>

<Story {title} {slug} showOptions={true} component={Component} {initial} />
