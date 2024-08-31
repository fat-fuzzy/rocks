<script lang="ts">
	import type {StylesApi} from '$lib/api/styles.api'
	import type {StyleInputGroup} from '$lib/api/styles.types'

	import {onMount, getContext} from 'svelte'
	import fatFuzzyUi from '@fat-fuzzy/ui'

	import PlaybookStore from '$lib/api/store.svelte'

	const {InputRange, InputGroup} = fatFuzzyUi.blocks
	const {ToggleMenu} = fatFuzzyUi.recipes

	type Props = {
		styleInput: StyleInputGroup
		familyName: string
		categoryName: string
		size?: string
		formaction?: string
		onupdate: (payload: {
			name: string
			items: {id: string; value: string}[]
		}) => void
	}

	let {
		styleInput,
		categoryName,
		familyName,
		size,
		formaction,
		onupdate,
	}: Props = $props()

	const playbookContext: StylesApi = getContext('playbookContext')
	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)

	let apiSize = '2xs'
	let apiColor = 'primary'
	let apiVariant = 'outline'

	const COMPONENT_IMPORTS: {[input: string]: any} = {
		radio: InputGroup,
		range: InputRange,
		checkbox: InputGroup,
		toggle: ToggleMenu,
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
		onupdate(payload)
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
		onupdate(payload)
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

	onMount(() => {
		// Set the initial styles
		playbookContext.applyStyles(playbookStore.styles)
	})

	let {id, input, name, value, items} = $derived(styleInput)
	let currentValue = $derived(
		styles[categoryName] &&
			styles[categoryName].families[familyName] &&
			styles[categoryName].families[familyName][name]
			? styles[categoryName].families[familyName][name]
			: value,
	)
	let updatedItems = $derived(
		items.map((i) => {
			return {
				...i,
				text: i.text ?? '',
				asset: i.asset ?? '',
				initial: i.value === currentValue ? 'active' : 'inactive',
				name: i.id,
			}
		}),
	)
</script>

<svelte:window on:keydown={keydown} />

{#if input === 'toggle'}
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
		onupdate={(event) => handleToggle(event, familyName, styleInput.id)}
		init={(event) => handleToggle(event, familyName, currentValue)}
	/>
{:else}
	{#if input === 'radio' ?? input === 'checkbox'}
		{@const InputComponent = COMPONENT_IMPORTS[input]}
		<InputComponent
			{id}
			{items}
			name={id}
			type={input}
			value={currentValue}
			legend={name}
			layout={styleInput.layout ?? ''}
			container={styleInput.container ?? ''}
			threshold={size ?? apiSize}
			size={size ?? apiSize}
			color={apiColor}
			variant={styleInput.variant}
			oninput={(event) => handleInput(event, familyName)}
		/>
	{/if}
	{#if input == 'range'}
		{@const InputComponent = COMPONENT_IMPORTS[input]}
		<InputComponent
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
