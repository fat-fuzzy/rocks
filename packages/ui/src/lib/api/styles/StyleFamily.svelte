<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import ToggleMenu from '$lib/components/compositions/menus/ToggleMenu.svelte'
	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	import InputGroup from '$lib/components/compositions/forms/InputGroup.svelte'
	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'
	import {currentStyles, theme} from '$lib/stores/api'
	import {themes} from '$types/constants.js'
	import {initStyles} from './styles-api'

	export let title = ''
	export let category = 'app'
	export let page = ''

	let stylesApi = initStyles()
	let options = stylesApi.getFormOptions(category)

	let styles: StyleTree
	let apiSize = 'xs'
	let apiColor = 'primary'
	let apiVariant = 'outline'

	const COMPONENT_IMPORTS: {[input: string]: ComponentType} = {
		radio: InputGroup,
		range: InputRange,
		checkbox: InputGroup,
		toggle: ToggleMenu,
	}

	const updateStyles = (payload: {name: string; items: {id: string; value: string}[]}) => {
		payload.items.forEach(({id, value}) => {
			const [category, family, style, name] = id.split('.')
			const styleValue = {[style]: value}
			const familyValue = {[family]: styleValue}
			styles[category] = {...styles[category], ...familyValue}
			if (style === 'brightness') {
				const currentTheme = themes.indexOf(value) || 1
				theme.set(currentTheme)
			}
		})
		stylesApi.applyStyles(styles)

		currentStyles.set(stylesApi.getStyleTree()) // This updates on the client if JS is available
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

	function handleSelect(event, familyName: string, name: string, id: string) {
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

	$: {
		styles = $currentStyles
		styles && stylesApi.applyStyles(styles)
		options = stylesApi.getFormOptions(category)
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
{#each Object.keys(options) as familyName}
	{@const family = options[familyName]}

	{#if family.canApplyStyles({item: title, category})}
		<Fieldset
			legend={family.title}
			id={family.id}
			layout={family.layout}
			container={family.container || 'burrito'}
			variant={family.variant}
			size={family.size}
			name={familyName}
			background="polar"
		>
			{#each family.items as styleInput}
				{@const {id, input, name, value, items} = styleInput}
				{#if styleInput.canApplyStyles({item: title, category})}
					{#if input === 'radio' || input === 'checkbox'}
						{@const InputComponent = COMPONENT_IMPORTS[input]}
						<svelte:component
							this={InputComponent}
							{id}
							{items}
							{name}
							type={input}
							{value}
							legend={name}
							layout={styleInput.layout || ''}
							container={styleInput.container || ''}
							size={styleInput.size}
							color={apiColor}
							variant={styleInput.variant}
							on:changed={(event) => handleInput(event, familyName)}
						/>
					{/if}
					{#if input == 'range'}
						{@const InputComponent = COMPONENT_IMPORTS[input]}
						<svelte:component
							this={InputComponent}
							id={styleInput.id}
							label={styleInput.name}
							{items}
							{value}
							name={styleInput.id}
							layout={styleInput.layout || ''}
							size="sm"
							color={apiColor}
							variant={styleInput.variant}
							on:input={(event) => handleInput(event, familyName)}
						/>
					{/if}
					{#if input === 'toggle'}
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
							id={styleInput.id}
							title={styleInput.name !== familyName ? styleInput.name : ''}
							items={updatedItems}
							{page}
							layout={styleInput.layout || ''}
							size={apiSize}
							color={apiColor}
							variant={apiVariant}
							container={styleInput.container}
							on:click={(event) => handleToggle(event, familyName, styleInput.id)}
						/>
					{/if}
					{#if input === 'datalist'}
						<label for={`choice-${styleInput.name}`} class={`l:stack ${apiSize} font:${apiSize}`}>
							{`Select ${styleInput.name}`}
							<input
								list={`datalist-${styleInput.name}`}
								id={`choice-${styleInput.name}`}
								name={styleInput.id}
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
				{/if}
			{/each}
		</Fieldset>
	{/if}
{/each}
