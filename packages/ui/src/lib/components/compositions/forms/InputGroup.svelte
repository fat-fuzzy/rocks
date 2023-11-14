<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	import InputRadio from '$lib/components/blocks/forms/InputRadio.svelte'
	import InputCheck from '$lib/components/blocks/forms/InputCheck.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	// export let label = 'To be or not to be'
	// export let hint = 'That is the question'

	// 	export let label = 'A hundred thousand welcomes.'
	// 	export let hint = `I could weep
	// And I could laugh, I am light and heavy. Welcome.`
	export let id = ''
	export let name = ''
	export let legend = ''
	export let value = ''
	export let type = 'radio' // checkbox
	export let items: any = []
	export let layout = ''
	export let container = ''
	export let size = ''
	export let color = ''
	export let variant = ''

	const COMPONENT_IMPORTS: {[input: string]: ComponentType} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	function handleInput(event, name) {
		let payload = {}
		switch (type) {
			case 'radio':
				payload = {
					name,
					...event.detail,
				}
				break
			case 'check':

			case 'radio':
				payload = {
					name,
					items: event.detail,
				}
		}
		dispatch('changed', payload)
	}
</script>

<Fieldset {id} {type} {legend} {layout} {size} {variant} container={container ?? ''} {color}>
	{@const InputComponent = COMPONENT_IMPORTS[type]}
	{#each items as input}
		{@const checked = input.value === value}
		<svelte:component
			this={InputComponent}
			id={`${name}-${input.value}`}
			{value}
			name={id}
			label={input.text}
			{checked}
			{color}
			{...input}
			on:input={(event) => handleInput(event, name)}
		/>
	{/each}
</Fieldset>
