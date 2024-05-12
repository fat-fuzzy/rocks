<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import {blocks} from '@fat-fuzzy/ui-s5'
	const {InputRange} = blocks

	const dispatch = createEventDispatcher()

	export let color = ''

	export let size = 'xxs'
	export let id = 'fieldOfView'
	export let label = 'Field of View'
	export let fieldOfView = 60
	export let min = 1
	export let max = 179
	export let step = 1
	export let disabled: boolean | undefined = undefined

	function update() {
		dispatch('input', {
			value: fieldOfView,
		})
	}
</script>

<InputRange
	bind:value={fieldOfView}
	{id}
	name={id}
	{label}
	{max}
	{min}
	oninput={update}
	{size}
	{step}
	{color}
	{disabled}
/>
