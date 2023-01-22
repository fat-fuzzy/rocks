<script lang="ts">
	import type {UIProps} from './story-options'
	import {options} from './story-options'
	import format from '../utils/format'
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	// TODO: figure out if I can deduct props
	export let selected: UIProps
	export let size = 'sm'
	export let component = ''

	let {layout, color} = selected

	let current = Object.keys(selected).map((key) => ({name: key, value: selected[key]}))

	function handleInput(event, name) {
		const payload = {
			name,
			items: [
				{
					id: event.target.name.toLowerCase(),
					value: event.target.value,
				},
			],
		}
		dispatch('changed', payload)
	}

	function handleToggle(event, id, name) {
		const selected = event.detail.selected // TODO: no multiple values for now
		if (selected.length) {
			const payload = {
				name,
				items: [
					{
						id: id.toLowerCase(),
						value: selected[0].pressed ? selected[0].id : '',
					},
				],
			}
			dispatch('changed', payload)
		}
	}
</script>

<form on:submit|preventDefault class={`l-${layout} ${size} card:lg layer ${color}`}>
	{#each current as option}
		{#if options[option.name] && !options[option.name].exclude?.includes(component)}
			{@const optionItems = options[option.name].items}
			{@const optionName = options[option.name].name}
			{@const optionLayout = options[option.name].layout}
			<Fieldset
				legend={optionName}
				slug={`field-${optionName}`}
				type="input-group"
				layout={optionLayout}
			>
				{#each optionItems as optionGroup}
					{@const {name, input, items, layout} = optionGroup}
					{@const classes = layout ? `l-${layout}` : ``}
					{#if input === 'radio' || input === 'checkbox'}
						{#each items as { id, label }}
							{@const checked = id === option.value}
							<label for={`${input}-${id}`} class={classes}>
								{label}
								<input
									type={input}
									id={`${input}-${id}`}
									value={id}
									{name}
									{checked}
									class="primary"
									on:input={(event) => handleInput(event, optionName)}
								/>
							</label>
						{/each}
					{/if}
					{#if input === 'toggle'}
						<ToggleMenu
							id={name}
							title={name !== optionName ? name : ''}
							{items}
							{layout}
							on:changed={(event) => handleToggle(event, name, optionName)}
						/>
					{/if}
					{#if input === 'datalist'}
						<label for={`choice-${name}`}>{`Select ${name}`}</label>
						<input
							list={`items-${name}`}
							id={`choice-${name}`}
							{name}
							on:input={(event) => handleInput(event, optionName)}
						/>
						<datalist id={`items-${name}`}>
							{#each items as { id, label, asset }}
								<option {id} value={asset}>{format.formatLabel(label, asset)}</option>
							{/each}
						</datalist>
					{/if}
				{/each}
			</Fieldset>
		{/if}
	{/each}
</form>
