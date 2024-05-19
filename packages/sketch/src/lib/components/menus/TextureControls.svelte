<script lang="ts">
	import type {Filters} from '$types'
	import {recipes} from '@fat-fuzzy/ui-s5'
	import store from '$lib/components/sketch/store.svelte'
	const {ToggleMenu} = recipes

	type Props = {
		id: string
		color?: string
		size?: string
		variant?: string
		background?: string
		layout?: string
		breakpoint?: string
		threshold?: string
		channels?: string[]
		blur?: number
		convolutions?: string[]
		onupdate: (payload: any) => void // TODO: Fix type
	}

	let {size = 'xs', channels, blur, convolutions, onupdate}: Props = $props()

	const DEFAULT_FILTERS = {
		channels: 'rgba',
		blur: 0,
		convolutions: ['normal'],
	}

	let filters: Filters = $state(DEFAULT_FILTERS)

	let channelMenuItems = $derived(
		channels?.map((c) => ({
			id: c,
			name: c,
			text: c,
			value: c,
			initial: c === filters.channels ? 'active' : 'inactive',
		})) || [],
	)

	let blurMenuItems = $derived(
		blur?.map((b) => ({
			id: b,
			name: b,
			text: `blur ${b}`,
			value: b,
			initial: b === filters.blur ? 'active' : 'inactive',
		})) || [],
	)

	let effectMenuItems = $derived(
		convolutions?.map((b) => ({
			id: b,
			name: b,
			text: b,
			value: b,
			initial: filters.convolutions.includes(b) ? 'active' : 'inactive',
		})) || [],
	)

	function updateChannel(selected: {name: string; pressed: boolean}) {
		if (selected.pressed) {
			filters.channels = selected.name
		} else {
			filters.channels = 'rgba'
		}
		onupdate(filters)
	}

	function updateBlur(selected: {
		value: number
		name: string
		pressed: boolean
	}) {
		if (selected.pressed) {
			filters.blur = selected.value
		} else {
			filters.blur = 0
		}
		onupdate(filters)
	}

	function updateEffects(selected: {name: string; pressed: boolean}) {
		if (!selected.pressed) {
			filters.convolutions = filters.convolutions.filter(
				(filter: string) => filter !== selected.name,
			)
		} else if (!filters.convolutions.includes(selected.name)) {
			filters.convolutions.push(selected.name)
		}
		if (filters.convolutions.length === 0) {
			filters.convolutions = ['normal']
		}
		onupdate(filters)
	}
</script>

{#if channels}
	<ToggleMenu
		id="channels"
		{size}
		mode="radio"
		layout="switcher"
		color="primary"
		variant="bare"
		items={channelMenuItems}
		onupdate={updateChannel}
		disabled={store.getSketchDisabled()}
	/>
{/if}
{#if blur}
	<ToggleMenu
		id="blur"
		{size}
		mode="radio"
		layout="switcher"
		color="accent"
		variant="bare"
		items={blurMenuItems}
		onupdate={updateBlur}
		disabled={store.getSketchDisabled()}
	/>
{/if}
{#if convolutions}
	<ToggleMenu
		id="convolutions"
		{size}
		mode="multiple"
		layout="switcher"
		color="primary"
		variant="bare"
		items={effectMenuItems}
		onupdate={updateEffects}
		disabled={store.getSketchDisabled()}
	/>
{/if}
