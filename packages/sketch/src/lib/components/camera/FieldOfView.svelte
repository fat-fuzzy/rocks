<script lang="ts">
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {InputRange} = blocks

	type Props = {
		id?: string
		label?: string
		size?: string
		color?: string
		fieldOfView: number
		min?: number
		max?: number
		step?: number
		disabled?: boolean
		onupdate: (payload: {value: number}) => void
	}

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
	}: Props = $props()

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
