<script lang="ts">
	import type {IStyleInputGroup, IStyleFamily} from '$types'

	import {getContext} from 'svelte'
	import fatFuzzyUi from '@fat-fuzzy/ui'

	import StylesApi from '$lib/api/styles.svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'

	const {InputRange} = fatFuzzyUi.blocks
	const {InputGroup} = fatFuzzyUi.drafts
	const {ToggleMenu} = fatFuzzyUi.recipes
	const {Fieldset} = fatFuzzyUi.drafts

	type Props = {
		styleInput: IStyleInputGroup
		family: IStyleFamily
		familyName: string
		categoryName: string
		formaction?: string
		onupdate: (payload: {
			name: string
			items: {id: string; value: string}[]
		}) => void
	}

	let {styleInput, family, familyName, formaction, onupdate}: Props = $props()

	let apiSize = '2xs'
	let apiFont = 'xs'
	let apiColor = 'primary'
	let apiVariant = 'outline'
	let apiJustify = 'stretch'

	let {id, input, name, value, assetType, items} = $derived(styleInput)
	let currentValue = $derived(value)

	let updatedItems = $derived(
		items.map((i) => {
			return {
				...i,
				text: i.text ?? '',
				asset: i.asset ?? '',
				initial: i.value === currentValue ? 'active' : 'inactive',
				name: i.id,
				id: i.id,
			}
		}),
	)

	const COMPONENT_IMPORTS: {[input: string]: any} = {
		radio: InputGroup,
		range: InputRange,
		checkbox: InputGroup,
		toggle: ToggleMenu,
	}

	function handleInput(event) {
		const payload = {
			name: familyName.toLowerCase(),
			items: [
				{
					id: event.id,
					name: event.name.toLowerCase(),
					value: event.value,
				},
			],
		}
		onupdate(payload)
	}

	function handleSelect(
		event: Event,
		familyName: string,
		name: string,
		id: string,
	) {
		let target = event.target as HTMLInputElement
		// TODO: reject input if it's not in values list -> form validation /!\
		const payload = {
			name: familyName.toLowerCase(),
			items: [
				{
					id,
					name: name.toLowerCase(),
					value: target.value,
				},
			],
		}
		onupdate(payload)
	}

	function handleToggle(
		selected: {
			name: string
			value?: string | number
			state: string
		}[],
	) {
		let items: {id: string; name: string; value: string}[] = []
		let payload = {
			id,
			name: familyName.toLowerCase(),
			items,
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
			let singleton = {
				id,
				name: id,
				value: '',
			}
			payload.items = [singleton]
		}
		onupdate(payload)
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

{#if input === 'toggle'}
	<Fieldset
		id={family.name}
		layout={family.layout}
		container={family.container}
		size={family.size}
		name={familyName}
		justify={apiJustify}
	>
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
			{assetType}
			{formaction}
			onupdate={(event) => handleToggle(event)}
			init={(event) => handleToggle(event)}
		/>
	</Fieldset>
{:else}
	{#if input === 'radio' || input === 'checkbox'}
		{@const InputComponent = COMPONENT_IMPORTS[input]}
		<InputComponent
			{id}
			{items}
			name={id}
			type={input}
			value={currentValue}
			legend={name}
			layout={styleInput.layout ?? 'switcher'}
			container={styleInput.container ?? ''}
			threshold={apiSize}
			size={styleInput.size ?? apiSize}
			color={apiColor}
			font={apiFont}
			variant={styleInput.variant}
			oninput={(event) => handleInput(event)}
		/>
	{/if}
	{#if input == 'range'}
		{@const InputComponent = COMPONENT_IMPORTS[input]}
		<Fieldset
			id={family.name}
			layout={family.layout}
			container={family.container}
			size={family.size ?? apiSize}
			name={familyName}
			justify={apiJustify}
		>
			<InputComponent
				{id}
				label={styleInput.name}
				{items}
				value={currentValue}
				name={id}
				layout={styleInput.layout ?? ''}
				size={apiSize}
				color={apiColor}
				font={apiFont}
				variant={styleInput.variant}
				oninput={(event: Event) => handleInput(event)}
			/>
		</Fieldset>
	{/if}
	{#if input === 'datalist'}
		<label
			for={`choice-${styleInput.name}`}
			class={`l:stack size:${apiSize} font:${apiSize}`}
		>
			{`Select ${styleInput.name}`}
			<input
				list={`datalist-${styleInput.name}`}
				id={`choice-${styleInput.name}`}
				name={id}
				class={apiSize}
				oninput={(event: Event) =>
					handleSelect(event, familyName, styleInput.name, styleInput.id)}
			/>
			<datalist id={`datalist-${styleInput.name}`}>
				{#each items as { id, text, asset, value }}
					<option {id} label={text} value={`${asset}:${value}`}> </option>
				{/each}
			</datalist>
		</label>
	{/if}
{/if}
