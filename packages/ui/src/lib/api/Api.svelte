<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './styles-api'
	import {enhance} from '$app/forms'
	import format from '../utils/format'
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import InputRadio from '../blocks/forms/InputRadio.svelte'
	import InputCheck from '../blocks/forms/InputCheck.svelte'
	import {getDefaultOptions} from './styles-api'
	import {selectedStore} from '../stores/api'

	export let title = ''
	export let category = 'app'
	export let page = ''
	export let method = 'POST'
	export let enter = 'enter'
	export let update = 'update'
	export let reset = 'reset'

	let selected: StyleTree
	let apiLayout = 'switcher'
	let apiSize = 'xxs'
	let apiVariant = ''

	let ApiOptions = getDefaultOptions()
	let styleCategories = category === 'app' ? ['app'] : [category, 'shared', 'app']
	let formOptions = styleCategories.map((cat) => ApiOptions.getCategoryOptions(cat))

	const COMPONENT_IMPORTS: {[input: string]: ComponentType} = {
		radio: InputRadio,
		checkbox: InputCheck,
		toggle: ToggleMenu,
	}

	const updateSelected = (payload: {name: string; items: {id: string; value: string}[]}) => {
		payload.items.forEach(({id, value}) => {
			const [category, family, style, name] = id.split('.')
			const styleValue = {[style]: value}
			const familyValue = {[family]: styleValue}
			selected[category] = {...selected[category], ...familyValue}
		})
		ApiOptions.applyStyles(selected)
		selectedStore.set(ApiOptions.getStyleTree()) // This updates on the client if JS is available
	}

	function handleInput(event, name) {
		const payload = {
			name,
			items: [
				{
					id: event.target.id,
					name: event.target.name.toLowerCase(),
					value: event.target.value,
				},
			],
		}
		updateSelected(payload)
	}

	function handleSelect(event, familyName, name) {
		// TODO: reject input if it's not in values list -> form validation /!\
		const payload = {
			name: familyName.toLowerCase(),
			items: [
				{
					id: event.target.id,
					name: name.toLowerCase(),
					value: event.target.value,
				},
			],
		}
		updateSelected(payload)
	}

	function handleToggle(event: CustomEvent, familyName: string, id: string) {
		const selected = event.detail.selected // TODO: no multiple values for now
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
			updateSelected(payload)
		}
	}

	$: {
		selected = $selectedStore
		selected && ApiOptions.applyStyles(selected)
		styleCategories = category === 'app' ? ['app'] : [category, 'shared', 'app']
		formOptions = styleCategories.map((cat) => ApiOptions.getCategoryOptions(cat))
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

<form
	{method}
	action={page ? `/${page}?/${enter}` : `?/${enter}`}
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({update}) => {
			// this update function comes from +page.server.ts
			update({reset: false})
		}
	}}
	class={`l:${apiLayout}:${apiSize}`}
>
	{#each formOptions as styles}
		{#if styles}
			{@const styleFamilies = Object.keys(styles)}
			{#each styleFamilies as familyName}
				{@const styleFamily = styles[familyName]}
				{#if styleFamily.includes(title) && !styleFamily.excludes(category) && !styleFamily.excludes(title)}
					<Fieldset
						legend={familyName}
						id={styleFamily.id}
						type="input-group"
						layout={styleFamily.layout}
						size={apiSize}
						name={familyName}
					>
						{#each styleFamily.items as styleInput}
							{@const {input, value, items} = styleInput}
							{#if styleInput.includes(title) && !styleInput.excludes(category) && !styleInput.excludes(title)}
								{#if input === 'radio' || input === 'checkbox'}
									{@const InputComponent = COMPONENT_IMPORTS[input]}
									{#each items as { id, ...inputProps }}
										{@const checked = value && id === value}
										<svelte:component
											this={InputComponent}
											id={styleInput.id}
											{...inputProps}
											name={styleInput.id}
											{checked}
											layout={styleInput.layout || ''}
											variant={apiVariant || ''}
											size={apiSize || ''}
											on:input={(event) => handleInput(event, familyName)}
										/>
									{/each}
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
										formaction={update}
										size={apiSize || ''}
										on:click={(event) => handleToggle(event, familyName, styleInput.id)}
									/>
								{/if}
								{#if input === 'datalist'}
									<label for={`choice-${styleInput.name}`} class="l:stack:${apiSize}">
										{`Select ${styleInput.name}`}
										<input
											list={`${styleInput.name}-${styleInput.name}`}
											id={styleInput.id}
											name={styleInput.id}
											class={`${apiSize}`}
											on:input={(event) => handleSelect(event, familyName, styleInput.name)}
										/>
										<datalist id={`${styleInput.name}-${styleInput.name}`}>
											{#each items as { id, text, asset }}
												<option {id} value={asset}>
													{format.formatLabel(text || '', asset)}
												</option>
											{/each}
										</datalist>
									</label>
								{/if}
							{/if}
						{/each}
					</Fieldset>
				{/if}
			{/each}
		{/if}
	{/each}
	<!-- <button data-key="enter">Update UI</button> -->
</form>
