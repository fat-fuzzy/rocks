<script lang="ts">
	import type {
		ToggleSettingsProps,
		InputCallbackProps,
		InputProps,
	} from '$types'

	import InputGroup from '#lib/components/blocks/inputs/InputGroup.svelte'

	let {
		assetType = 'emoji',
		selected,
		oninput,
		size = 'xs',
	}: ToggleSettingsProps & InputCallbackProps = $props()

	let values = $derived(Object.entries(selected).map(([, value]) => value))

	const options: InputProps[] = $derived([
		{
			id: 'brightness',
			label: 'Brightness',
			name: 'brightness',
			slug: 'brightness',
			type: 'radio',
			size: 'xs',
			justify: 'start',
			background: 'inherit',
			variant: 'bare',
			errors: [],
			value: Object.entries(selected).map(([key, value]) => {
				if (key) return value as string
				return ''
			}),
			items: [
				{
					label: 'System',
					id: 'brightness.system',
					name: 'brightness.system',
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
					errors: [],
				},
				{
					label: 'Day',
					id: 'brightness.day',
					name: 'brightness.day',
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
					errors: [],
				},
				{
					label: 'Night',
					id: 'brightness.night',
					name: 'brightness.night',
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
					errors: [],
				},
			],
		},
		{
			label: 'Contrast',
			id: 'contrast',
			name: 'contrast',
			type: 'radio',
			size: 'xs',
			justify: 'start',
			layout: 'stack',
			slug: 'contrast',
			background: 'inherit',
			variant: 'bare',
			errors: [],
			value: Object.entries(selected).map(([key, value]) => {
				if (key) return value as string
				return ''
			}),
			items: [
				{
					label: 'Default',
					id: 'contrast.contrast',
					name: 'contrast.contrast',
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
					errors: [],
					checked:
						selected.brightness === 'system' ||
						selected.contrast === 'contrast',
				},
				{
					label: 'Blend',
					id: 'contrast.blend',
					name: 'contrast.blend',
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
					errors: [],
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
			context="form"
			{...item}
			{assetType}
			{oninput}
			value={values}
			isUiControl={true}
			errors={[]}
		/>
	{/each}
</div>
