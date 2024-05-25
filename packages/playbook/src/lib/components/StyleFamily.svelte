<script lang="ts">
	import type {Meta} from '$lib/props/types'
	import type {StylesApi} from '$lib/api/styles.api'
	import type {StyleTree} from '$lib/api/styles.types'

	import {getContext} from 'svelte'
	import {blocks, recipes} from '@fat-fuzzy/ui-s5'
	const {Fieldset, InputRange} = blocks
	const {ToggleMenu, InputGroup} = recipes

	import * as ui from '$lib/api/store.svelte'

	type Props = {
		category?: string
		formaction?: string
		meta: Meta
	}

	let {category = 'app', formaction, meta}: Props = $props()

	const stylesApi: StylesApi = getContext('stylesApi')

	let apiSize = 'xs'
	let apiColor = 'primary'
	let apiVariant = 'outline'

	const COMPONENT_IMPORTS: {[input: string]: any} = {
		radio: InputGroup,
		range: InputRange,
		checkbox: InputGroup,
		toggle: ToggleMenu,
	}

	let styles: StyleTree = $derived(stylesApi.getStyleTree())
	let settings = $derived(styles.app)

	const updateStyles = (payload: {
		name: string
		items: {id: string; value: string}[]
	}) => {
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
		const payload = {
			name,
			items: [
				{
					id: event.id,
					name: event.name.toLowerCase(),
					value: event.value,
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
					value: event.value,
				},
			],
		}
		updateStyles(payload)
	}

	function handleToggle(
		selected: {
			name: string
			value: string | number
			state: string
		}[],
		familyName: string,
		id: string,
	) {
		console.log('handleToggle selected', selected)
		if (selected.length) {
			const payload = {
				name: familyName,
				items: [
					{
						id,
						value: String(selected[0].value),
					},
				],
			}

			updateStyles(payload)
		}
	}

	let optionsPerCategory = $derived(stylesApi.getFormOptions(category, meta))
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
{#each optionsPerCategory as options}
	{#each Object.keys(options) as familyName}
		{@const family = options[familyName]}
		<Fieldset
			legend={family.title}
			layout={family.layout}
			size={family.size}
			name={familyName}
			justify={family.justify}
			background="polar"
		>
			{#each family.items as styleInput}
				{#if styles[category] && styles[category][familyName]}
					{@const {id, input, name, value, items} = styleInput}
					{@const currentValue = styles[category][familyName][name] ?? value}
					{#if input === 'toggle'}
						{@const updatedItems = items.map((i) => {
							const pressed = currentValue !== '' && i.value === currentValue
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
							mode={styleInput.mode || 'radio'}
							{formaction}
							onupdate={(event) =>
								handleToggle(event, familyName, styleInput.id)}
						/>
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
									value={currentValue}
									legend={name}
									layout={styleInput.layout || ''}
									container={styleInput.container || ''}
									threshold={apiSize}
									size={apiSize}
									color={apiColor}
									variant={styleInput.variant}
									onchanged={(event) => handleInput(event, familyName)}
								/>
							{/if}
							{#if input == 'range'}
								{@const InputComponent = COMPONENT_IMPORTS[input]}
								<svelte:component
									this={InputComponent}
									{id}
									label={styleInput.name}
									{items}
									value={currentValue}
									name={id}
									layout={styleInput.layout || ''}
									size={apiSize}
									color={apiColor}
									variant={styleInput.variant}
									oninput={(event) => handleInput(event, familyName)}
								/>
							{/if}
							{#if input === 'datalist'}
								<label
									for={`choice-${styleInput.name}`}
									class={`l:stack ${apiSize} font:${apiSize}`}
								>
									{`Select ${styleInput.name}`}
									<input
										list={`datalist-${styleInput.name}`}
										id={`choice-${styleInput.name}`}
										name={id}
										class={apiSize}
										oninput={(event) =>
											handleSelect(
												event,
												familyName,
												styleInput.name,
												styleInput.id,
											)}
									/>
									<datalist id={`datalist-${styleInput.name}`}>
										{#each items as { id, text, asset, value }}
											<option {id} label={text} value={`${asset}:${value}`}>
											</option>
										{/each}
									</datalist>
								</label>
							{/if}
						</div>
					{/if}
				{/if}
			{/each}
		</Fieldset>
	{/each}
{/each}
