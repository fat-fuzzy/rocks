<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {enhance} from '$app/forms'
	import {selectedStore} from '../stores/api'
	import format from '../utils/format'
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import InputRadio from '../blocks/forms/InputRadio.svelte'
	import InputCheck from '../blocks/forms/InputCheck.svelte'
	import {getDefaultOptions} from './styles-api'

	export let title = ''
	export let uiState = ''
	export let category = 'app'
	export let page = 'ui'
	export let method = 'POST'
	export let enter = 'enter'
	export let update = 'update'
	export let reset = 'reset'

	const apiOptions = getDefaultOptions()

	const COMPONENT_IMPORTS: {[input: string]: ComponentType} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	const updateSelected = (payload) => {
		const toUpdate = payload.items.reduce((values, option) => {
			return {...values, [option.name]: option.value}
		}, selected)

		selectedStore.update((data) => {
			return {...data, ...toUpdate}
		})
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

	function handleToggle(event, familyName, id) {
		const selected = event.detail.selected // TODO: no multiple values for now
		const [category, family, style] = id.split('.')
		if (selected.length) {
			const payload = {
				name: familyName,
				items: [
					{
						id,
						name: style, // TODO: clean this
						value: selected[0].pressed ? selected[0].id : '',
					},
				],
			}
			updateSelected(payload)
		}
	}

	let apiLayout = 'switcher'
	let apiSize = 'xxs'
	let apiVariant = ''

	$: selected = $selectedStore
	$: styleCategories = category === 'app' ? ['app'] : [category, 'shared', 'app']
	$: {
		uiState && apiOptions.applyStyles(JSON.parse(uiState))
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
	class={`l:${apiLayout}`}
>
	{#each styleCategories as styleCategory}
		{@const styles = apiOptions.getCategoryOptions(styleCategory)}
		{#if styles}
			{@const styleFamilies = Object.keys(styles)}
			{#each styleFamilies as familyName}
				{@const styleFamily = styles[familyName]}
				{#if styleFamily.includes(title) && !styleFamily.excludes(category) && !styleFamily.excludes(title)}
					<Fieldset
						legend={familyName}
						id={styleFamily.id}
						type="input-group"
						layout={`${styleFamily.layout}`}
						name={familyName}
					>
						{#each styleFamily.items as styleOption}
							{@const {name, input, value, items, layout} = styleOption}
							{#if styleOption.includes(title) && !styleOption.excludes(category) && !styleOption.excludes(title)}
								{#if input === 'radio' || input === 'checkbox'}
									{@const InputComponent = COMPONENT_IMPORTS[input]}
									{#each items as { id, ...inputProps }}
										{@const checked = value && id === value}
										<svelte:component
											this={InputComponent}
											id={`${input}-${id}`}
											{...inputProps}
											name={styleOption.id}
											{checked}
											variant={apiVariant || ''}
											layout={layout || ''}
											size={apiSize || ''}
											on:input={(event) => handleInput(event, familyName)}
										/>
									{/each}
								{/if}
								{#if input === 'toggle'}
									{@const updatedItems = items.map((i) => {
										return {
											...i,
											name: styleOption.id,
											text: i.text || '',
											asset: i.asset || '',
											pressed: value && i.id === value,
										}
									})}
									<ToggleMenu
										id={name.toLowerCase()}
										title={name !== familyName ? name : ''}
										items={updatedItems}
										{layout}
										size={apiSize}
										{page}
										formaction={update}
										on:click={(event) => handleToggle(event, familyName, styleOption.id)}
									/>
								{/if}
								{#if input === 'datalist'}
									<label for={`choice-${name}`} class="l:stack">
										{`Select ${name}`}
										<input
											list={`${styleOption.name}-${name}`}
											id={styleOption.id}
											name={styleOption.id}
											on:input={(event) => handleSelect(event, familyName, name)}
										/>
										<datalist id={`${styleOption.name}-${name}`}>
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
