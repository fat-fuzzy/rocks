<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	const {InputRange} = ui.blocks

	import type {FieldOfViewProps} from '$types'

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
