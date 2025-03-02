<script lang="ts">
	import type {Meta, StyleTree} from '$types'
	import StylesApi from '$lib/api/styles.svelte'

	import {onMount, getContext} from 'svelte'

	import {PlaybookActor} from '$lib/api/actor.svelte'
	import StyleInput from './StyleInput.svelte'

	type Props = {
		category?: string
		formaction?: string
		meta?: Meta
	}

	let {category = 'app', formaction, meta}: Props = $props()

	// This is the context that provides form options and updates the StyleTree every time the Styles API is updated
	let context: StylesApi = getContext('playbookContext')

	// This is the global actor that provides state updates to the Playbook Elements:
	// it is updated every time the StyleTree is updated (see function below)
	let actor: PlaybookActor = getContext('playbookActor')
	let formOptions = $derived(context.getFormOptions(category, meta))

	function updateStyles(payload: {
		name: string
		items: {id: string; value: string}[]
	}) {
		let updatedStyles: StyleTree = {}
		payload.items.forEach(({id, value}) => {
			if (!id) return
			const [category, family, style, name] = id.split('.')
			const styleValue = {[style]: value}

			if (!updatedStyles[category]) {
				updatedStyles[category] = {families: {}}
			}
			updatedStyles[category].families[family] = styleValue
			if (style === 'brightness' || style === 'contrast') {
				actor.styles['app'].families[family] = styleValue
				actor.app = {...actor.app, [style]: value}
			}
		})
		context.applyStyles(updatedStyles)
		actor.styles = context.getStyleTree() // This should update the client if JS is available
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
		context.applyStyles(actor.styles)
	})
</script>

<svelte:window on:keydown={keydown} />

{#if formOptions}
	{#each formOptions as categoryOptions}
		{#if categoryOptions.families}
			{@const families = Object.keys(categoryOptions.families)}
			{#each families as familyName}
				{@const family = categoryOptions.families[familyName]}
				<details class="l:stack:2xs">
					<summary
						class="font:sm font:heading font:semi size:2xs variant:bare color:neutral"
					>
						{familyName}
					</summary>
					<div class="l:switcher:2xs">
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
