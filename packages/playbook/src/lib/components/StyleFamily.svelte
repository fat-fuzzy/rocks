<script lang="ts">
	import type {Meta, StyleTree} from '$types'
	import type {StylesApi} from '$lib/api/styles.api'

	import {onMount, getContext} from 'svelte'

	import PlaybookStore from '$lib/api/store.svelte'
	import StyleInput from './StyleInput.svelte'

	type Props = {
		category?: string
		formaction?: string
		meta?: Meta
	}

	let {category = 'app', formaction, meta}: Props = $props()

	const playbookContext: StylesApi = getContext('playbookContext')
	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let formOptions = $derived(playbookContext.getFormOptions(category, meta))

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
					<StyleInput
						{family}
						styleInput={styleInputGroup}
						{familyName}
						categoryName={categoryOptions.name}
						{formaction}
						onupdate={updateStyles}
					/>
				{/each}
			{/each}
		{/if}
	{/each}
{/if}
