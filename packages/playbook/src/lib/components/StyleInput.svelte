<script lang="ts">
	import type {IStyleInputGroup, IStyleFamily} from '$types'

	import type {
		FuzzyPayload,
		UiColor,
		UiContainer,
		UiLayout,
		UiSize,
		UiState,
		UiVariant,
	} from '@fat-fuzzy/ui'
	import fatFuzzyUi from '@fat-fuzzy/ui'
	const {InputRange, InputGroup} = fatFuzzyUi.blocks
	const {ToggleMenu} = fatFuzzyUi.recipes
	const {Fieldset} = fatFuzzyUi.drafts

	type Props = {
		styleInput: IStyleInputGroup
		family: IStyleFamily
		familyName: string
		formaction?: string
		onupdate: (payload: {
			name: string
			items: {id: string; label: string; value: string}[]
		}) => void
	}

	let {styleInput, family, familyName, formaction, onupdate}: Props = $props()

	let apiSize: UiSize = '2xs'
	let apiFont: UiSize = 'xs'
	let apiColor: UiColor = 'primary'
	let apiVariant: UiVariant = 'outline'
	let apiJustify = 'stretch'

	let {id, input, name, value, assetType, items} = $derived(styleInput)
	let currentValue = $derived(value)

	let updatedItems = $derived(
		items.map((i) => {
			const state = i.value === currentValue ? 'active' : 'inactive'
			return {
				...i,
				label: i.label ?? i.asset ?? i.name ?? i.id,
				asset: i.asset ?? '',
				initial: state as UiState,
				name: i.id,
				id: i.id,
				state: i.state,
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

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement
		const updated = {
			name: familyName.toLowerCase(),
			items: [
				{
					id: target.id,
					label: target.name.toLowerCase(),
					name: target.name.toLowerCase(),
					value: target.value,
				},
			],
		}
		onupdate(updated)
	}

	function handleRangeInput(event) {
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
					label: name.toLowerCase(),
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
			state?: string
		}[],
	) {
		let items: {id: string; name: string; label: string; value: string}[] = []
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
			layout={(styleInput.layout as UiLayout) ?? ''}
			font={(styleInput.font as UiSize) ?? apiFont}
			size={apiSize}
			color={apiColor}
			variant={apiVariant}
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
		<InputGroup
			{id}
			{items}
			name={id}
			type={input}
			value={currentValue}
			legend={name}
			layout={styleInput.layout ?? 'switcher'}
			container={(styleInput.container as UiContainer) ?? ''}
			threshold={apiSize}
			size={styleInput.size ?? apiSize}
			color={apiColor}
			font={apiFont}
			variant={styleInput.variant}
			oninput={(event) => handleInput(event)}
		/>
	{/if}
	{#if input == 'range'}
		<Fieldset
			id={family.name}
			layout={family.layout}
			container={family.container}
			size={family.size ?? apiSize}
			name={familyName}
			justify={apiJustify}
		>
			<InputRange
				{id}
				label={styleInput.name}
				{items}
				value={classToNumber[currentValue] ?? currentValue}
				name={id}
				layout={(styleInput.layout as UiLayout) ?? ''}
				size={apiSize}
				color={apiColor}
				font={apiFont}
				variant={styleInput.variant}
				oninput={handleRangeInput}
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
