<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {enhance} from '$app/forms'
	import {selectedStore} from '../stores/api'
	import format from '../utils/format'
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import InputRadio from '../blocks/forms/InputRadio.svelte'
	import InputCheck from '../blocks/forms/InputCheck.svelte'
	import {getDefaultOptions} from '../api/style-api'

	export let title = ''
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
			return {...values, [option.id]: option.value}
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
					id: event.target.name.toLowerCase(),
					name: event.target.name,
					value: event.target.value,
				},
			],
		}
		updateSelected(payload)
	}

	function handleSelect(event, name) {
		const payload = {
			name,
			items: [
				{
					id: name.toLowerCase(),
					name: name,
					value: event.target.value,
				},
			],
		}
		updateSelected(payload)
	}

	function handleToggle(event, name, id) {
		const selected = event.detail.selected // TODO: no multiple values for now
		if (selected.length) {
			const payload = {
				name,
				items: [
					{
						id: id.toLowerCase(),
						name: id,
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
						slug={`fieldset-${familyName}`}
						type="input-group"
						layout={`${styleFamily.layout}`}
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
											value={id}
											{...inputProps}
											{name}
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
										on:click={(event) => handleToggle(event, familyName, name)}
									/>
								{/if}
								{#if input === 'datalist'}
									<label for={`choice-${name}`} class="l:stack">
										{`Select ${name}`}
										<input
											list={`items-${name}`}
											id={`choice-${name}`}
											{name}
											on:input={(event) => handleSelect(event, familyName)}
										/>
										<datalist id={`items-${name}`}>
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
