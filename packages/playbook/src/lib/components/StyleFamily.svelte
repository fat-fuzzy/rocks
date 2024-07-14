<script lang="ts">
	import type {Meta} from '$lib/props/types'
	import type {StylesApi} from '$lib/api/styles.api'
	import type {StyleTree} from '$lib/api/styles.types'

	import {onMount, getContext} from 'svelte'
	import {blocks, recipes} from '@fat-fuzzy/ui-s5'

	import PlaybookStore from '$lib/api/store.svelte'

	const {Fieldset, InputRange} = blocks
	const {ToggleMenu, InputGroup} = recipes

	type Props = {
		category?: string
		formaction?: string
		meta: Meta
	}

	let {category = 'app', formaction, meta}: Props = $props()

	const playbookContext: StylesApi = getContext('playbookContext')
	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let formOptions = $derived(playbookContext.getFormOptions(category, meta))

	let apiSize = '2xs'
	let apiColor = 'primary'
	let apiVariant = 'outline'
	let apiJustify = 'stretch'

	const COMPONENT_IMPORTS: {[input: string]: any} = {
		radio: InputGroup,
		range: InputRange,
		checkbox: InputGroup,
		toggle: ToggleMenu,
	}

	function updateStyles(payload: {
		name: string
		items: {id: string; value: string}[]
	}) {
		let updatedStyles: StyleTree = {}
		payload.items.forEach(({id, value}) => {
			const [category, family, style, name] = id.split('.')
			const styleValue = {[style]: value}
			const familyValue = {[family]: styleValue}
			updatedStyles[category] = {
				...playbookStore.styles[category],
				...familyValue,
			}
			if (style === 'brightness' || style === 'contrast') {
				playbookStore.app = {...playbookStore.app, [style]: value}
			}
		})
		playbookContext.applyStyles(updatedStyles)
		playbookStore.styles = playbookContext.getStyleTree() // This should update the client if JS is available
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
		let payload: {
			id: string
			name: string
			items: {id: string; name: string; value: string}[]
		} = {
			id,
			name: familyName.toLowerCase(),
			items: [],
		}
		if (selected.length) {
			payload.items = selected.map((item) => {
				return {
					id,
					name: item.name.toLowerCase(),
					value: String(item.value),
				}
			})
		} else {
			payload.items = [
				{
					id,
					name: id,
					value: '',
				},
			]
		}
		updateStyles(payload)
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
{#each formOptions as options}
	{#each Object.keys(options) as familyName}
		{@const family = options[familyName]}
		<Fieldset
			id={family.title}
			legend={family.title}
			layout={family.layout}
			container={family.container}
			size={family.size}
			name={familyName}
			justify={apiJustify}
		>
			{#each family.items as styleInput}
				{#if styles[category] && styles[category][familyName]}
					{@const {id, input, name, value, items} = styleInput}
					{@const currentValue = styles[category][familyName][name] ?? value}
					{#if input === 'toggle'}
						{@const updatedItems = items.map((i) => {
							return {
								...i,
								text: i.text ?? '',
								asset: i.asset ?? '',
								initial: i.value === currentValue ? 'active' : 'inactive',
								name: i.id,
							}
						})}
						<ToggleMenu
							{id}
							title={styleInput.name}
							items={updatedItems}
							layout={styleInput.layout ?? ''}
							size={apiSize}
							color={apiColor}
							variant={apiVariant}
							container={styleInput.container}
							mode={styleInput.mode ?? 'radio'}
							{formaction}
							onupdate={(event) =>
								handleToggle(event, familyName, styleInput.id)}
							init={(event) => handleToggle(event, familyName, currentValue)}
						/>
					{:else}
						{#if input === 'radio' ?? input === 'checkbox'}
							{@const InputComponent = COMPONENT_IMPORTS[input]}
							<svelte:component
								this={InputComponent}
								{id}
								{items}
								name={id}
								type={input}
								value={currentValue}
								legend={name}
								layout={styleInput.layout ?? ''}
								container={styleInput.container ?? ''}
								threshold={family.size ?? apiSize}
								size={family.size ?? apiSize}
								color={apiColor}
								variant={styleInput.variant}
								onupdate={(event) => handleInput(event, familyName)}
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
								layout={styleInput.layout ?? ''}
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
					{/if}
				{/if}
			{/each}
		</Fieldset>
	{/each}
{/each}
