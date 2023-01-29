<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {ComponentProps, ApiOptions} from './options'
	import format from '../utils/format'
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import InputRadio from '../blocks/forms/InputRadio.svelte'
	import InputCheck from '../blocks/forms/InputCheck.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let title = ''
	export let options: ApiOptions
	export let category = ''
	// TODO: figure out how I can deduct props from Svelte component
	export let selected: ComponentProps

	const COMPONENT_IMPORTS: {[input: string]: ComponentType} = {
		radio: InputRadio,
		checkbox: InputCheck,
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
		dispatch('changed', payload)
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

			dispatch('changed', payload)
		}
	}

	let apiLayout = 'switcher'
	let apiSize = 'xxs'
	let apiVariant = ''

	$: elementOptions = Object.keys(selected).map((key) => ({name: key, value: selected[key]}))

	// TODO: clean, comment
</script>

<form on:submit|preventDefault class={`l:${apiLayout}`}>
	{#each elementOptions as prop}
		{#if options[prop.name]}
			{@const styleFamily = options[prop.name]}
			{#if !styleFamily.include || styleFamily.include.indexOf(title) !== -1}
				{#if !styleFamily.exclude || (styleFamily.exclude.indexOf(category) === -1 && styleFamily.exclude.indexOf(title) === -1)}
					<Fieldset
						legend={styleFamily.name}
						slug={`field-${styleFamily.name}`}
						type="input-group"
						layout={`${styleFamily.layout}`}
					>
						{#if styleFamily.items}
							{#each styleFamily.items as styleOptions}
								{@const {name, input, items, layout, include, exclude} = styleOptions}
								{#if !include || include.indexOf(title) !== -1}
									{#if !exclude || (exclude.indexOf(category) === -1 && exclude.indexOf(title) === -1)}
										{#if input === 'radio' || input === 'checkbox'}
											{@const InputComponent = COMPONENT_IMPORTS[input]}
											{#each items as { id, label }}
												{@const checked = id === prop.value}
												<svelte:component
													this={InputComponent}
													id={`${input}-${id}`}
													value={id}
													{label}
													{name}
													{checked}
													variant={apiVariant || ''}
													layout={layout || ''}
													size={apiSize || ''}
												/>
											{/each}
										{/if}
										{#if input === 'toggle'}
											<ToggleMenu
												id={name}
												title={name !== styleFamily.name ? name : ''}
												{items}
												{layout}
												size={apiSize}
												on:changed={(event) => handleToggle(event, styleFamily.name, name)}
											/>
										{/if}
										{#if input === 'datalist'}
											<label for={`choice-${name}`}>{`Select ${name}`}</label>
											<input
												list={`items-${name}`}
												id={`choice-${name}`}
												{name}
												on:input={(event) => handleInput(event, styleFamily.name)}
											/>
											<datalist id={`items-${name}`}>
												{#each items as { id, label, asset }}
													<option {id} value={asset}>{format.formatLabel(label, asset)}</option>
												{/each}
											</datalist>
										{/if}
									{/if}
								{/if}
							{/each}
						{/if}
					</Fieldset>
				{/if}
			{/if}
		{/if}
	{/each}
</form>
