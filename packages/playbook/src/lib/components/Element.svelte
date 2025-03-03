<script lang="ts">
	import {getContext} from 'svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'

	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'

	type Props = {
		title: string
		depth?: number
		path?: string
		SpecifiedElement: any // TODO: fix types
		formaction?: string
		actionPath?: string
		category?: string
	}

	let {
		title,
		depth = 0,
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
	let {settings} = $derived(playbookActor.app)

	//== App settings (user controlled)
	let brightness = $derived(settings.brightness || '')
	let contrast = $derived(settings.contrast || '')

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
	let surfaceClass = $derived(`surface:0:neutral`)
	let settingsClasses = $derived(
		`settings:${brightness}:${contrast} ${surfaceClass}`,
	)

	let GenericElement = $derived(ApiElement[category])
	let fixtures = $derived(
		playbookActor.getElementFixtures({category, component: title}),
	)
	let statusFixures = $derived(
		fixtures?.status ? fixtures.status.find((p) => p.value === status) : {},
	)
	let currentProps = $derived(fixtures?.status ? statusFixures : fixtures)
	let link = $derived(
		path.substring(0, path.indexOf(category) + category.length),
	)
</script>

<article
	id={`ravioli-${title}`}
	class={`variant:bare w:auto ui:${title.toLowerCase()} ${settingsClasses}`}
>
	<a
		href={`${link}/${title}`}
		class="title ravioli:2xs l:flex emoji:link surface:1:primary align:center"
	>
		<svelte:element this={`h${String(depth)}`} class="link font:xs">
			{title}
		</svelte:element>
	</a>
	<div class={`ravioli:lg ${containerClasses}`}>
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
</article>
