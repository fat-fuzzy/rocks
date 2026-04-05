<script lang="ts">
	import type {ToggleSettingsProps, InputCallbackProps} from '$types'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'

	let {selected, oninput}: ToggleSettingsProps & InputCallbackProps = $props()

	const options = $derived([
		{
			legend: 'Brightness',
			label: 'Brightness',
			name: 'brightness',
			type: 'radio',
			color: 'primary',
			size: '2xs',
			variant: 'bare',
			id: 'brightness',
			items: [
				{
					label: 'System',
					id: 'brightness.system',
					value: 'system',
					shape: 'round',
					asset: 'home',
					checked:
						!selected.brightness || selected.brightness === 'system'
							? true
							: undefined,
				},
				{
					label: 'Day',
					id: 'brightness.primary',
					value: 'day',
					shape: 'round',
					asset: 'day',
					checked: selected.brightness === 'day' ? true : undefined,
				},
				{
					label: 'Night',
					id: 'brightness.primary',
					value: 'night',
					shape: 'round',
					asset: 'night',
					checked: selected.brightness === 'night' ? true : undefined,
				},
			],
		},
		{
			legend: 'Contrast',
			label: 'Contrast',
			name: 'contrast',
			type: 'radio',
			color: 'accent',
			size: '2xs',
			variant: 'bare',
			id: 'contrast',
			items: [
				{
					label: 'Default',
					id: 'contrast.contrast',
					value: 'contrast',
					asset: 'contrast',
					checked:
						!selected.contrast || selected.contrast === 'contrast'
							? true
							: undefined,
				},
				{
					label: 'Blend',
					id: 'contrast.blend',
					value: 'blend',
					asset: 'blend',
					checked: selected.contrast === 'blend' ? true : undefined,
				},
			],
		},
	])
</script>

<div class="l:flex maki:block:sm align:start">
	{#each options as item, i (i)}
		<InputGroup {...item} {oninput} />
	{/each}
</div>
