<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	const {InputRange} = ui.blocks

	import type {CameraProps} from '$types'

	let {
		color = '',
		size = '2xs',
		id = 'camera',
		label = 'Camera',
		angle = $bindable(60),
		min = 0,
		max = 360,
		step = 0.01,
		disabled,
		onupdate,
	}: CameraProps = $props()

	function updateCamera() {
		onupdate({value: angle})
	}
</script>

<InputRange
	bind:value={angle}
	{id}
	name={id}
	{label}
	{max}
	{min}
	oninput={updateCamera}
	{size}
	{step}
	{color}
	{disabled}
/>
