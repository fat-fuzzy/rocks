<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {onDestroy} from 'svelte'

	import ToggleMenu from '$lib/components/recipes/menus/ToggleMenu.svelte'
	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	import InputGroup from '$lib/components/recipes/forms/InputGroup.svelte'
	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'
	import * as ui from '$stores/ui'
	import {initStyles} from '$lib/api/styles'

	export let title = ''
	export let category = 'app'
	export let formaction: string | undefined = undefined

	let stylesApi = initStyles()
	let options = stylesApi.getFormOptions(category)

	let apiSize = 'xs'
	let apiColor = 'primary'
	let apiVariant = 'outline'

	const COMPONENT_IMPORTS: {[input: string]: ComponentType} = {
		radio: InputGroup,
		range: InputRange,
		checkbox: InputGroup,
		toggle: ToggleMenu,
	}

	let styles: StyleTree = stylesApi.getStyleTree()
	let settings = styles.app

	const stores = [
		ui.app.subscribe((value) => {
			if (value) {
				settings = {app: value}
			}
		}),
		ui.styles.subscribe((value) => {
			if (value) {
				styles = value
			}
		}),
	]

	const updateStyles = (payload: {name: string; items: {id: string; value: string}[]}) => {
		payload.items.forEach(({id, value}) => {
			const [category, family, style, name] = id.split('.')
			const styleValue = {[style]: value}
			const familyValue = {[family]: styleValue}
			styles[category] = {...styles[category], ...familyValue}
			if (style === 'brightness' || style === 'contrast') {
				ui.app.set({...settings.app, [style]: value})
			}
		})
		stylesApi.applyStyles(styles)

		ui.styles.set(stylesApi.getStyleTree()) // This updates on the client if JS is available
	}

	function handleInput(event, name: string) {
		const target = event.target ?? event.detail
		const payload = {
			name,
			items: [
				{
					id: target.id,
					name: target.name.toLowerCase(),
					value: target.value,
				},
			],
		}
		updateStyles(payload)
	}

	function handleSelect(event: CustomEvent, familyName: string, name: string, id: string) {
		// TODO: reject input if it's not in values list -> form validation /!\
		const payload = {
			name: familyName.toLowerCase(),
			items: [
				{
					id,
					name: name.toLowerCase(),
					value: event.target.value,
				},
			],
		}
		updateStyles(payload)
	}

	function handleToggle(event: CustomEvent, familyName: string, id: string) {
		const selected = event.detail.selected // TODO: no multiple values for no
		if (selected.length) {
			const payload = {
				name: familyName,
				items: [
					{
						id,
						value: selected[0].pressed ? selected[0].value : '',
					},
				],
			}
			updateStyles(payload)
		}
	}

	$: options = stylesApi.getFormOptions(category)
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

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:window on:keydown={keydown} />
{#each Object.keys(options) as familyName}
	{@const family = options[familyName]}

	{#if family.canApplyStyles({item: title, category})}
		{#each family.items as styleInput}
			{@const {id, input, name, value, items} = styleInput}
			{#if styleInput.canApplyStyles({item: title, category})}
				{#if input === 'toggle'}
					<Fieldset
						legend={family.title}
						layout={family.layout}
						size={family.size}
						name={familyName}
						background="polar"
					>
						{@const updatedItems = items.map((i) => {
							const pressed = value !== '' && i.value === value
							const updatedItem = {
								...i,
								text: i.text || '',
								asset: i.asset || '',
								initial: pressed,
								name: i.id,
							}
							return updatedItem
						})}
						<ToggleMenu
							{id}
							title={styleInput.name}
							items={updatedItems}
							layout={styleInput.layout || ''}
							size={apiSize}
							color={apiColor}
							variant={apiVariant}
							container={styleInput.container}
							mode={styleInput.mode}
							{formaction}
							on:click={(event) => handleToggle(event, familyName, styleInput.id)}
						/>
					</Fieldset>
				{:else}
					<div class={`l:${family.layout}:${family.size} bg:polar`}>
						{#if input === 'radio' || input === 'checkbox'}
							{@const InputComponent = COMPONENT_IMPORTS[input]}
							<svelte:component
								this={InputComponent}
								{id}
								{items}
								name={id}
								type={input}
								{value}
								legend={name}
								layout={styleInput.layout || ''}
								container={styleInput.container || ''}
								threshold={apiSize}
								size={apiSize}
								color={apiColor}
								variant={styleInput.variant}
								on:changed={(event) => handleInput(event, familyName)}
							/>
						{/if}
						{#if input == 'range'}
							{@const InputComponent = COMPONENT_IMPORTS[input]}
							<svelte:component
								this={InputComponent}
								{id}
								label={styleInput.name}
								{items}
								{value}
								name={id}
								layout={styleInput.layout || ''}
								size={apiSize}
								color={apiColor}
								variant={styleInput.variant}
								on:input={(event) => handleInput(event, familyName)}
							/>
						{/if}
						{#if input === 'datalist'}
							<label for={`choice-${styleInput.name}`} class={`l:stack ${apiSize} font:${apiSize}`}>
								{`Select ${styleInput.name}`}
								<input
									list={`datalist-${styleInput.name}`}
									id={`choice-${styleInput.name}`}
									name={id}
									class={apiSize}
									on:input={(event) =>
										handleSelect(event, familyName, styleInput.name, styleInput.id)}
								/>
								<datalist id={`datalist-${styleInput.name}`}>
									{#each items as { id, text, asset, value }}
										<option {id} label={text} value={`${asset}:${value}`} />
									{/each}
								</datalist>
							</label>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	{/if}
{/each}
