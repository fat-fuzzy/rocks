<script lang="ts">
	import type {ToggleSettingsProps, InputCallbackProps} from '$types'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'

	let {selected, oninput}: ToggleSettingsProps & InputCallbackProps = $props()

	let values = $derived(Object.entries(selected).map(([key, value]) => value))

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
			value: Object.entries(selected).map(([key, value]) => {
				if (key) return value
				return ''
			}),
			items: [
				{
					label: 'System',
					id: 'brightness.system',
					value: 'system',
					asset: 'home',
					shape: 'round',
					size: 'xs',
					justify: 'start',
					color: 'primary',
					place: 'est',
					variant: 'bare',
				},
				{
					label: 'Day',
					id: 'brightness.primary',
					value: 'day',
					asset: 'day',
					shape: 'round',
					size: 'xs',
					justify: 'start',
					color: 'primary',
					place: 'est',
					variant: 'bare',
				},
				{
					label: 'Night',
					id: 'brightness.primary',
					value: 'night',
					asset: 'night',
					shape: 'round',
					size: 'xs',
					justify: 'start',
					place: 'est',
					color: 'primary',
					variant: 'bare',
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
			value: Object.entries(selected).map(([key, value]) => {
				if (key) return value
				return ''
			}),
			items: [
				{
					label: 'Default',
					id: 'contrast.contrast',
					value: 'contrast',
					asset: 'contrast',
					shape: 'round',
					size: 'xs',
					justify: 'start',
					place: 'est',
					color: 'accent',
					variant: 'bare',
				},
				{
					label: 'Blend',
					id: 'contrast.blend',
					value: 'blend',
					asset: 'blend',
					shape: 'round',
					size: 'xs',
					justify: 'start',
					place: 'est',
					color: 'accent',
					variant: 'bare',
				},
			],
		},
	])
</script>

<div class="l:flex maki:block:sm align:start">
	{#each options as item, i (i)}
		<InputGroup {...item} {oninput} value={values} />
	{/each}
</div>
