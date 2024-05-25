<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {Meta} from '$lib/api/props/types'
	import type {StylesApi} from '$lib/api/components/styles.api'
	import type {StyleTree} from '$lib/api/components/styles.types'

	import {onDestroy, getContext} from 'svelte'
	import {blocks, recipes} from '@fat-fuzzy/ui-s5'
	const {Fieldset, InputRange} = blocks
	const {ToggleMenu, InputGroup} = recipes

	import * as ui from '$stores/ui'

	export let category = 'app'
	export let formaction: string | undefined = undefined
	export let meta: Meta | undefined

	const stylesApi: StylesApi = getContext('stylesApi')
	let optionsPerCategory = stylesApi.getFormOptions(category, meta)

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
				styles = stylesApi.getStyleTree()
			}
		}),
	]

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

	function handleSelect(
		event: CustomEvent,
		familyName: string,
		name: string,
		id: string,
	) {
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
		const selected = event.detail.selected // TODO: test multiple values
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

	$: optionsPerCategory = stylesApi.getFormOptions(category, meta)
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
							on:click={(event) =>
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
									value={currentValue}
									name={id}
									layout={styleInput.layout || ''}
									size={apiSize}
									color={apiColor}
									variant={styleInput.variant}
									on:input={(event) => handleInput(event, familyName)}
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
										on:input={(event) =>
											handleSelect(
												event,
												familyName,
												styleInput.name,
												styleInput.id,
											)}
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
		</Fieldset>
	{/each}
{/each}
