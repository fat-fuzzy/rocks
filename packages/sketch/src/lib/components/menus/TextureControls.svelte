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
		blur?: number[]
		convolutions?: string[]
		onupdate: (payload: any) => void // TODO: Fix type
		onload: (payload: any) => void // TODO: Fix type
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
		})) || [],
	)

	let blurMenuItems = $derived(
		blur?.map((b) => ({
			id: String(b),
			name: String(b),
			text: `blur ${b}`,
			value: b,
		})) || [],
	)

	let effectMenuItems = $derived(
		convolutions?.map((b) => ({
			id: b,
			name: b,
			text: b,
			value: b,
		})) || [],
	)

	function loadChannel(selected: {name: string}[]) {
		if (selected[0]) {
			filters.channels = selected[0].name
		} else {
			filters.channels = 'rgba'
		}
		onload(filters)
	}

	function loadBlur(
		selected: {
			name: string
		}[],
	) {
		if (selected[0]) {
			filters.blur = Number(selected[0].name)
		} else {
			filters.blur = 0
		}
		onload(filters)
	}

	function loadEffects(selected: {name: string}[]) {
		filters.convolutions = selected.map((s) => s.name)
		if (filters.convolutions.length === 0) {
			filters.convolutions = ['normal']
		}
		onload(filters)
	}

	function updateChannel(selected: {name: string}[]) {
		if (selected[0]) {
			filters.channels = selected[0].name
		} else {
			filters.channels = 'rgba'
		}
		onupdate(filters)
	}

	function updateBlur(
		selected: {
			name: string
		}[],
	) {
		if (selected[0]) {
			filters.blur = Number(selected[0].name)
		} else {
			filters.blur = 0
		}
		onupdate(filters)
	}

	function updateEffects(selected: {name: string}[]) {
		filters.convolutions = selected.map((s) => s.name)
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
		onload={loadChannel}
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
		onload={loadBlur}
		disabled={store.getSketchDisabled()}
	/>
{/if}
{#if convolutions}
	<ToggleMenu
		id="convolutions"
		{size}
		mode="check"
		layout="switcher"
		color="primary"
		variant="bare"
		items={effectMenuItems}
		onupdate={updateEffects}
		onload={loadEffects}
		disabled={store.getSketchDisabled()}
	/>
{/if}
