<script lang="ts">
	import {getContext} from 'svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'

	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'

	type Props = {
		title: string
		path?: string
		SpecifiedElement: any // TODO: fix types
		formaction?: string
		actionPath?: string
		category?: string
	}

	let {
		title,
		path = '',
		SpecifiedElement,
		formaction,
		actionPath,
		category = '',
	}: Props = $props()

	// TODO: fix types
	let ApiElement: {[category: string]: any} = {
		tokens: Token,
		blocks: Block,
		layouts: Layout,
		recipes: Recipe,
	}
	let playbookActor: PlaybookActor = getContext('playbookActor')
	let styles = $derived(playbookActor.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')

	//== Layout settings (user controlled)
	// Container options
	// - [container + size] work together
	let container = $derived(containerStyles.container ?? '')
	let size = $derived(containerStyles.size ?? '') // Container size
	let status = $derived(elementStyles.status ?? '')

	let containerClasses = $derived(
		category === 'blocks'
			? 'col:center'
			: category !== 'tokens' &&
				  category !== 'blocks' &&
				  title !== 'Burrito' &&
				  title !== 'Stack' &&
				  title !== 'Switcher'
				? `l:${container}:${size}`
				: '',
	)
	let GenericElement = $derived(ApiElement[category])
	let fixtures = $derived(
		playbookActor.getElementFixtures({category, component: title}),
	)
	let statusFixures = $derived(
		fixtures?.status ? fixtures.status.find((p) => p.value === status) : {},
	)
	let currentProps = $derived(fixtures?.status ? statusFixures : fixtures)
</script>

<div class={`ravioli:md ${containerClasses}`}>
	<GenericElement
		isPage={false}
		{path}
		{title}
		{SpecifiedElement}
		props={currentProps}
		{formaction}
		{actionPath}
		id={title}
	/>
</div>
