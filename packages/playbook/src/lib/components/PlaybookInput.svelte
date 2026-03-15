<script lang="ts">
	import type {IPlaybookInputGroup, IPlaybookFamily} from '$types'
	import type {
		FuzzyPayload,
		UiColor,
		UiLayout,
		UiSize,
		UiVariant,
	} from '@fat-fuzzy/ui'

	import fatFuzzyUi from '@fat-fuzzy/ui'
	const {InputRange, InputGroup} = fatFuzzyUi.blocks
	const {ToggleMenu} = fatFuzzyUi.recipes
	const {Fieldset} = fatFuzzyUi.drafts

	type Props = {
		styleInput: IPlaybookInputGroup
		family: IPlaybookFamily
		familyName: string
		formaction?: string
		onupdate: (payload: {
			name: string
			items: {id: string; value: string}[]
		}) => void
	}

	let {styleInput, family, familyName, formaction, onupdate}: Props = $props()

	let apiSize: UiSize = '2xs'
	let apiFont: UiSize = 'xs'
	let apiColor = 'primary'
	let apiVariant = 'outline'
	let apiJustify = 'stretch'

	let {id, input, name, value, assetType, items} = $derived(styleInput)
	let currentValue = $derived(value)

	let updatedItems: FuzzyPayload[] = $derived(
		items.map((i) => {
			const state = i.value === currentValue ? 'active' : 'inactive'
			return {
				...i,
				label: i.label ?? i.asset ?? i.name ?? i.id,
				asset: i.asset ?? '',
				initial: state,
				name: i.id,
				id: i.id,
				value: i.value,
			}
		}),
	)

	const classToNumber: {[key: string]: string} = {
		// TODO: figure out a generic way to map range number values to string labels with no JS
		xs: '0',
		sm: '25',
		md: '50',
		lg: '75',
		xl: '100',
	}

	const COMPONENT_IMPORTS: {[input: string]: any} = {
		radio: InputGroup,
		range: InputRange,
		checkbox: InputGroup,
		toggle: ToggleMenu,
	}

	function handleInput(event: Event, payload: FuzzyPayload) {
		const target = event.target as HTMLInputElement
		const updated = {
			name: familyName.toLowerCase(),
			items: [
				{
					id: payload.id,
					name: payload.name.toLowerCase(),
					value: String(payload.value ?? target.value),
				},
			],
		}
		onupdate(updated)
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
					label: name.toLowerCase(),
					value: target.value,
				},
			],
		}
		onupdate(payload)
	}

	function handleToggle(selected: FuzzyPayload[]) {
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
					label: item.name.toLowerCase(),
					value: String(item.value),
					state: String(item.value),
				}
			})
		} else {
			payload.items = []
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
			layout={styleInput.layout as UiLayout}
			size={apiSize}
			color={apiColor as UiColor}
			variant={apiVariant as UiVariant}
			container={styleInput.container}
			mode={styleInput.mode ?? 'radio'}
			{assetType}
			{formaction}
			onupdate={(payload: FuzzyPayload[]) => handleToggle(payload)}
			init={() => handleToggle(updatedItems)}
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
			oninput={(event: Event, payload: FuzzyPayload) =>
				handleInput(event, payload)}
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
				value={classToNumber[currentValue] ?? currentValue}
				name={id}
				layout={styleInput.layout ?? ''}
				size={apiSize}
				color={apiColor}
				font={apiFont}
				variant={styleInput.variant}
				oninput={(event: Event, payload: FuzzyPayload) =>
					handleInput(event, payload)}
			/>
		</Fieldset>
	{/if}
	{#if input === 'datalist'}
		<label
			for={`choice-${styleInput.name}`}
			class={`l:stack:${apiSize} font:${apiSize}`}
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
				{#each items as { id, text, asset, value }, i (i)}
					<option {id} label={text} value={`${asset}:${value}`}> </option>
				{/each}
			</datalist>
		</label>
	{/if}
{/if}
