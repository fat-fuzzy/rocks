<script lang="ts">
	import type {ToggleSettingsProps, InputCallbackProps, UiControl} from '$types'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'

	let {
		assetType = 'emoji',
		selected,
		oninput,
		size = 'xs',
	}: ToggleSettingsProps & InputCallbackProps = $props()

	let values = $derived(Object.entries(selected).map(([, value]) => value))

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
			variant: 'bare',
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
					asset: 'system',
					assetType,
					shape: 'pill',
					size,
					justify: 'between',
					color: 'primary',
					background: 'primary',
					variant: 'bare',
				},
				{
					label: 'Day',
					id: 'brightness.day',
					slug: 'brightness.day',
					value: 'day',
					asset: 'day',
					assetType,
					shape: 'pill',
					size,
					justify: 'between',
					color: 'primary',
					background: 'primary',
					variant: 'bare',
				},
				{
					label: 'Night',
					id: 'brightness.night',
					slug: 'brightness.night',
					value: 'night',
					asset: 'night',
					assetType,
					shape: 'pill',
					size,
					justify: 'between',
					color: 'primary',
					background: 'primary',
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
			variant: 'bare',
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
					assetType,
					shape: 'pill',
					size,
					justify: 'between',
					color: 'accent',
					background: 'accent',
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
					assetType,
					shape: 'pill',
					size,
					justify: 'between',
					color: 'accent',
					background: 'accent',
					variant: 'bare',
					checked:
						selected.brightness !== 'system' && selected.contrast === 'blend',
				},
			],
		},
	])
</script>

<div class="ui-controls l:flex nowrap maki:block:sm align:start">
	{#each options as item, i (i)}
		<InputGroup
			{...item}
			{assetType}
			{oninput}
			value={values}
			isUiControl={true}
		/>
	{/each}
</div>
