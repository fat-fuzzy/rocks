<script lang="ts">
	import type {Meta, StyleTree} from '$types'

	import {getContext} from 'svelte'

	import StylesApi from '$lib/api/styles.svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'
	import StyleInput from './StyleInput.svelte'

	type Props = {
		category?: string
		formaction?: string
		meta?: Meta
	}

	let {category = 'app', formaction, meta}: Props = $props()

	// This is the context that provides form options and updates the StyleTree every time the Styles API is updated
	let playbookContext: StylesApi = getContext('playbookContext')

	// This is the global actor that provides state updates to the Playbook Elements:
	// it is updated every time the StyleTree is updated (see function below)
	let playbookActor: PlaybookActor = getContext('playbookActor')
	let formOptions = $derived(playbookContext.getFormOptions(category, meta))

	function updateStyles(payload: {
		name: string
		items: {id: string; value: string}[]
	}) {
		let updatedStyles: StyleTree = playbookContext.getStyleTree()
		payload.items.forEach(({id, value}) => {
			const [category, family, style, name] = id.split('.')
			const styleValue = {[style]: value}

			if (!updatedStyles[category]) {
				updatedStyles[category] = {families: {}}
			}
			updatedStyles[category].families[family] = styleValue

			if (style === 'brightness' || style === 'contrast') {
				playbookActor.styles['app'].families[family] = styleValue
				playbookActor.preferences = {
					...playbookActor.preferences,
					[style]: value,
				}
			}
		})
		playbookContext.applyStyles(updatedStyles)
		playbookActor.styles = playbookContext.getStyleTree() // This should update the client if JS is available
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
</script>

<svelte:window on:keydown={keydown} />

{#if formOptions}
	{#each formOptions as categoryOptions}
		{#if categoryOptions.families}
			{@const families = Object.keys(categoryOptions.families)}
			{#each families as familyName}
				{@const family = categoryOptions.families[familyName]}
				<details class="surface:1:neutral l:stack:2xs shape:soft" open>
					<summary
						class="color:neutral font:sm font:heading ravioli:3xs shape:soft"
						data-testid={`details-summary-${familyName}`}
					>
						{familyName}
					</summary>
					<div
						class="l:flex:2xs justify:stretch align:start ravioli:xs shape:soft"
						data-testid={`details-content-${familyName}`}
					>
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
					</div>
				</details>
			{/each}
		{/if}
	{/each}
{/if}
