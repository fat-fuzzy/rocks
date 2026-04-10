<script lang="ts">
	import type {ToggleSettingsProps, InputCallbackProps, UiControl} from '$types'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'

	let {selected, oninput}: ToggleSettingsProps & InputCallbackProps = $props()

	let values = $derived(Object.entries(selected).map(([key, value]) => value))

	const options: UiControl[] = $derived([
		{
			label: 'Brightness',
			name: 'brightness',
			slug: 'brightness',
			type: 'radio',
			size: 'xs',
			justify: 'start',
			id: 'brightness',
			background: 'inherit',
			value: Object.entries(selected).map(([key, value]) => {
				if (key) return value
				return ''
			}),
			items: [
				{
					label: 'System',
					id: 'brightness.system',
					slug: 'brightness.system',
					value: 'system',
					asset: 'home',
					shape: 'pill',
					size: 'xs',
					justify: 'between',
					color: 'primary',
					variant: 'bare',
				},
				{
					label: 'Day',
					id: 'brightness.day',
					slug: 'brightness.day',
					value: 'day',
					asset: 'day',
					shape: 'pill',
					size: 'xs',
					justify: 'between',
					color: 'primary',
					variant: 'bare',
				},
				{
					label: 'Night',
					id: 'brightness.night',
					slug: 'brightness.night',
					value: 'night',
					asset: 'night',
					shape: 'pill',
					size: 'xs',
					justify: 'between',
					color: 'primary',
					variant: 'bare',
				},
			],
		},
		{
			label: 'Contrast',
			name: 'contrast',
			type: 'radio',
			size: 'xs',
			justify: 'start',
			layout: 'stack',
			id: 'contrast',
			slug: 'contrast',
			background: 'inherit',
			value: Object.entries(selected).map(([key, value]) => {
				if (key) return value
				return ''
			}),
			items: [
				{
					label: 'Default',
					id: 'contrast.contrast',
					slug: 'contrast.contrast',
					value: 'contrast',
					asset: 'contrast',
					shape: 'pill',
					size: 'xs',
					justify: 'between',
					color: 'accent',
					variant: 'bare',
					checked:
						selected.brightness === 'system' ||
						selected.contrast === 'contrast',
				},
				{
					label: 'Blend',
					id: 'contrast.blend',
					slug: 'contrast.blend',
					value: 'blend',
					asset: 'blend',
					shape: 'pill',
					size: 'xs',
					justify: 'between',
					color: 'accent',
					variant: 'bare',
					checked:
						selected.brightness !== 'system' && selected.contrast === 'blend',
				},
			],
		},
	])
</script>

<div class="l:flex maki:block:sm align:start">
	{#each options as item, i (i)}
		<InputGroup
			{...item}
			{oninput}
			value={values}
			isUiControl={true}
			background="inherit"
		/>
	{/each}
</div>
