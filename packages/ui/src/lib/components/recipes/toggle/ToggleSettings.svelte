<script lang="ts">
	import type {ToggleSettingsProps, InputCallbackProps} from '$types'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'

	let {selected, oninput}: ToggleSettingsProps & InputCallbackProps = $props()

	const options = $derived([
		{
			label: 'Brightness',
			name: 'brightness',
			type: 'radio',
			color: 'primary',
			size: 'xs',
			justify: 'start',
			id: 'brightness',
			background: 'inherit',
			items: [
				{
					label: 'System',
					id: 'brightness.system',
					value: 'system',
					asset: 'home',
					shape: 'round',
					color: 'primary',
					place: 'est',
					variant: 'fill',
					checked:
						!selected.brightness || selected.brightness === 'system'
							? true
							: undefined,
				},
				{
					label: 'Day',
					id: 'brightness.primary',
					value: 'day',
					asset: 'day',
					shape: 'round',
					color: 'primary',
					place: 'est',
					variant: 'fill',
					checked: selected.brightness === 'day' ? true : undefined,
				},
				{
					label: 'Night',
					id: 'brightness.primary',
					value: 'night',
					asset: 'night',
					shape: 'round',
					place: 'est',
					color: 'primary',
					variant: 'fill',
					checked: selected.brightness === 'night' ? true : undefined,
				},
			],
		},
		{
			label: 'Contrast',
			name: 'contrast',
			type: 'radio',
			color: 'primary',
			size: 'xs',
			justify: 'start',
			id: 'contrast',
			background: 'inherit',
			items: [
				{
					label: 'Default',
					id: 'contrast.contrast',
					value: 'contrast',
					asset: 'contrast',
					shape: 'round',
					place: 'est',
					color: 'accent',
					variant: 'fill',
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
					shape: 'round',
					place: 'est',
					color: 'accent',
					variant: 'fill',
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
