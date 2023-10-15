<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	import InputRadio from '$lib/components/blocks/forms/InputRadio.svelte'
	import InputCheck from '$lib/components/blocks/forms/InputCheck.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let name = ''
	export let items: any = []
	export let props: string[] = []

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
</script>

<Fieldset legend={name} type="input-group" {...props}>
	{#each items as inputOptions}
		{@const {name, input, value, items, layout} = inputOptions}
		{#if input === 'radio' || input === 'checkbox'}
			{@const InputComponent = COMPONENT_IMPORTS[input]}
			{#each items as { id, ...inputProps }}
				{@const checked = id === value}
				<svelte:component
					this={InputComponent}
					id={`${input}-${id}`}
					value={id}
					{name}
					{checked}
					{...inputProps}
					{layout}
					on:input={(event) => handleInput(event, name)}
				/>
			{/each}
		{/if}
	{/each}
</Fieldset>
