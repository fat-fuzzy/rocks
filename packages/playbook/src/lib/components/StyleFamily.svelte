<script lang="ts">
	import type {Meta} from '$lib/props/types'
	import type {StylesApi} from '$lib/api/styles.api'
	import type {StyleTree} from '$lib/api/styles.types'

	import {onMount, getContext} from 'svelte'
	import {blocks} from '@fat-fuzzy/ui' // TODO: fix types

	import PlaybookStore from '$lib/api/store.svelte'
	import StyleInput from './StyleInput.svelte'

	const {Fieldset} = blocks

	type Props = {
		category?: string
		formaction?: string
		meta?: Meta
	}

	let {category = 'app', formaction, meta}: Props = $props()

	const playbookContext: StylesApi = getContext('playbookContext')
	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let formOptions = $derived(playbookContext.getFormOptions(category, meta))

	let apiJustify = 'stretch'

	function updateStyles(payload: {
		name: string
		items: {id: string; value: string}[]
	}) {
		let updatedStyles: StyleTree = {}
		payload.items.forEach(({id, value}) => {
			const [category, family, style, name] = id.split('.')
			const styleValue = {[style]: value}

			if (!updatedStyles[category]) {
				updatedStyles[category] = {families: {}}
			}
			updatedStyles[category].families[family] = styleValue
			if (style === 'brightness' || style === 'contrast') {
				playbookStore.styles['app'].families[family] = styleValue
				playbookStore.app = {...playbookStore.app, [style]: value}
			}
		})
		playbookContext.applyStyles(updatedStyles)
		playbookStore.styles = playbookContext.getStyleTree() // This should update the client if JS is available
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', {cancelable: true}))
	}

	onMount(() => {
		// Set the initial styles
		playbookContext.applyStyles(playbookStore.styles)
	})
</script>

<svelte:window on:keydown={keydown} />

{#if formOptions}
	{#each formOptions as categoryOptions}
		{#if categoryOptions.families}
			{@const families = Object.keys(categoryOptions.families)}
			{#each families as familyName}
				{@const family = categoryOptions.families[familyName]}
				{#each family.items as styleInputGroup}
					<Fieldset
						id={family.title}
						legend={family.title}
						layout={family.layout}
						container={family.container}
						size={family.size}
						name={familyName}
						justify={apiJustify}
					>
						<StyleInput
							styleInput={styleInputGroup}
							{familyName}
							categoryName={categoryOptions.name}
							size={styleInputGroup.size}
							{formaction}
							onupdate={updateStyles}
						/>
					</Fieldset>
				{/each}
			{/each}
		{/if}
	{/each}
{/if}
