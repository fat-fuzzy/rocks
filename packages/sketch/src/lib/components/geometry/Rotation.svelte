<script lang="ts">
	import type {RotationProps} from '$types'

	import ui from '@fat-fuzzy/ui'
	const {InputRange} = ui.blocks

	let {
		color = '',
		id = 'rotation',
		label = 'Angle',
		size = '2xs',
		angle = $bindable(0),
		min = 0,
		max = 360,
		disabled,
		onupdate,
	}: RotationProps = $props()

	function update() {
		onupdate({
			value: angle,
		})
	}
</script>

<InputRange
	bind:value={angle}
	id={`${id}-angle`}
	name={id}
	{label}
	{min}
	{max}
	oninput={update}
	{size}
	{color}
	{disabled}
/>
