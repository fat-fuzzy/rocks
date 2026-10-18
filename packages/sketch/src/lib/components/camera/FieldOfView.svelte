<script lang="ts">
	import type {FieldOfViewProps} from '#types'

	import {InputRange} from '@fat-fuzzy/ui'

	let {
		color = '',
		size = '2xs',
		id = 'fieldOfView',
		label = 'Field of View',
		fieldOfView = $bindable(60),
		min = 1,
		max = 179,
		step = 1,
		disabled,
		onupdate,
	}: FieldOfViewProps = $props()

	function updateFoV() {
		onupdate({value: fieldOfView})
	}
</script>

<InputRange
	bind:value={fieldOfView}
	{id}
	name={id}
	{label}
	{max}
	{min}
	oninput={updateFoV}
	{size}
	{step}
	{color}
	{disabled}
/>
