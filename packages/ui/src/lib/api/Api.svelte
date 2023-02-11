<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {enhance} from '$app/forms'
	import {selectedStore} from '../stores/api'
	import format from '../utils/format'
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import InputRadio from '../blocks/forms/InputRadio.svelte'
	import InputCheck from '../blocks/forms/InputCheck.svelte'
	import {API_OPTIONS} from './ui-api-options'

	export let title = ''
	export let category = 'app'
	export let page = 'ui'
	export let method = 'POST'
	export let enter = 'enter'
	export let update = 'update'
	export let reset = 'reset'

	const COMPONENT_IMPORTS: {[input: string]: ComponentType} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	const updateSelected = (payload) => {
		const toUpdate = payload.items.reduce((values, option) => {
			return {...values, [option.id]: option.value}
		}, selected)

		// TODO: this works, not sure how: understand how
		selected.update((data) => {
			return {...data, ...toUpdate}
		})

		selectedStore.update((data) => {
			return {...data, ...selected}
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

	$: options = {
		...API_OPTIONS[category],
		...API_OPTIONS['shared'],
		...API_OPTIONS['app'],
	}
	$: selected = $selectedStore
	$: initialOptions = Object.keys(options).map((key) => {
		return {
			name: key,
			value: options[key],
		}
	})

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', {cancelable: true}))
	}
	// TODO: select default options in form
	// TODO: try co clean this code 👇 some more
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
	{#each initialOptions as prop}
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
											{#each items as { id, ...inputProps }}
												{@const checked = id === prop.value.name}
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
													on:input={(event) => handleInput(event, styleFamily.name)}
												/>
											{/each}
										{/if}
										{#if input === 'toggle'}
											<ToggleMenu
												id={name.toLowerCase()}
												title={name !== styleFamily.name ? name : ''}
												{items}
												{layout}
												size={apiSize}
												{page}
												formaction={update}
												on:click={(event) => handleToggle(event, styleFamily.name, name)}
											/>
										{/if}
										{#if input === 'datalist'}
											<label for={`choice-${name}`} class="l:stack">
												{`Select ${name}`}
												<input
													list={`items-${name}`}
													id={`choice-${name}`}
													{name}
													on:input={(event) => handleSelect(event, styleFamily.name)}
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
								{/if}
							{/each}
						{/if}
					</Fieldset>
				{/if}
			{/if}
		{/if}
	{/each}
	<button data-key="enter">Update UI</button>
</form>
