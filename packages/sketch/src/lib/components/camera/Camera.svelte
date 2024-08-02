<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	const {InputRange} = ui.blocks

	type Props = {
		id?: string
		label?: string
		size?: string
		color?: string
		angle: number
		min?: number
		max?: number
		step?: number
		disabled?: boolean
		onupdate: (payload: {value: number}) => void
	}

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
	}: Props = $props()

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
