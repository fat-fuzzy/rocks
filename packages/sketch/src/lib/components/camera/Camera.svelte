<script lang="ts">
	import type {CameraProps} from '#types'

	import {InputRange} from '@fat-fuzzy/ui'

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
