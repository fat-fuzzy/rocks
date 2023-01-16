<script lang="ts">
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import type {UIProps} from './story-options'
	import {options} from './story-options'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	// TODO: figure out if I can deduct props
	export let selected: UIProps
	export let size = 'sm'

	let {layout} = selected

	let current = Object.keys(selected).map((key) => ({name: key, value: selected[key]}))

	// TODO: extract common function for constructing emoji + string
	const formatText = (name, emoji) => {
		return emoji ? `${emoji} ${name}` : name
	}

	function handleRadio(event) {
		const payload = {
			id: event.target.name.toLowerCase(),
			value: event.target.value,
		}
		console.log('handleRadio payload')
		console.log(payload)

		dispatch('changed', payload)
	}

	function handleDatalist(event) {
		const payload = {
			id: event.target.name.toLowerCase(),
			value: event.target.value,
		}
		console.log('handleDatalist payload')
		console.log(payload)

		dispatch('changed', payload)
	}

	function handleToggle(event, name) {
		const selected = event.detail.selected // TODO: no multiple values for now
		if (selected.length) {
			const payload = {
				id: name.toLowerCase(),
				value: selected[0].pressed ? selected[0].id : '',
			}
			console.log('handleToggle payload')
			console.log(payload)

			dispatch('changed', payload)
		}
	}
</script>

<form on:submit|preventDefault class={`l-${layout} ${size} card:lg layer  primary`}>
	{#each current as option}
		{@const {name, input, items} = options[option.name]}
		<Fieldset legend={name} slug={`field-${input}-${name}`} type="radio-group">
			{#if input === 'radio'}
				{#each items as { id, label }}
					{@const checked = id === option.value}
					<label for={`radio-${id}`}>
						{label}
						<input
							type="radio"
							id={`radio-${id}`}
							value={id}
							{name}
							{checked}
							on:input={handleRadio}
						/>
					</label>
				{/each}
			{/if}
			{#if input === 'toggle'}
				<ToggleMenu id={name} {items} on:changed={(event) => handleToggle(event, name)} />
			{/if}
			{#if input === 'datalist'}
				<label for={`choice-${name}`}>{`Select ${name}`}</label>
				<input list={`items-${name}`} id={`choice-${name}`} {name} on:input={handleDatalist} />
				<datalist id={`items-${name}`}>
					{#each items as { id, label, asset }}
						<option {id} value={asset}>{formatText(label, asset)}</option>
					{/each}
				</datalist>
			{/if}
		</Fieldset>
	{/each}
</form>
