<script lang="ts">
	import {onMount} from 'svelte'
	import type {Filters} from '$types'
	import ui from '@fat-fuzzy/ui'
	import actor from '$lib/components/sketch/actor.svelte'
	const {ToggleMenu} = ui.recipes

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
		init: (payload: any) => void // TODO: Fix type
	}

	let {
		size = 'xs',
		channels,
		blur,
		convolutions,
		onupdate,
		init,
	}: Props = $props()

	const DEFAULT_FILTERS = {
		channels: ['rgba'],
		blur: [0],
		convolutions: ['normal'],
	}

	let filters: Filters = $state(DEFAULT_FILTERS)

	let channelMenuItems = $derived(
		channels?.map((c) => ({
			id: c,
			name: c,
			label: c,
			value: c,
		})) || [],
	)

	let blurMenuItems = $derived(
		blur?.map((b) => ({
			id: String(b),
			name: String(b),
			label: `blur ${b}`,
			value: b,
		})) || [],
	)

	let effectMenuItems = $derived(
		convolutions?.map((b) => ({
			id: b,
			name: b,
			label: b,
			value: b,
		})) || [],
	)

	function loadChannel(selected: {name: string}[]) {
		if (selected.length > 0) {
			filters.channels = selected.map((s) => s.name)
		} else {
			filters.channels = ['rgba']
		}
	}

	function loadBlur(selected: {name: string}[]) {
		if (selected.length > 0) {
			filters.blur = selected.map((s) => Number(s.name))
		} else {
			filters.blur = [0]
		}
	}

	function loadEffects(selected: {name: string}[]) {
		filters.convolutions = selected.map((s) => s.name)
		if (filters.convolutions.length === 0) {
			filters.convolutions = ['normal']
		}
	}

	function updateChannel(selected: {name: string}[]) {
		loadChannel(selected)
		onupdate(filters)
	}

	function updateBlur(selected: {name: string}[]) {
		loadBlur(selected)
		onupdate(filters)
	}

	function updateEffects(selected: {name: string}[]) {
		loadEffects(selected)
		onupdate(filters)
	}

	onMount(() => {
		init(filters ?? DEFAULT_FILTERS)
	})
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
		init={loadChannel}
		disabled={actor.getSketchDisabled()}
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
		init={loadBlur}
		disabled={actor.getSketchDisabled()}
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
		init={loadEffects}
		disabled={actor.getSketchDisabled()}
	/>
{/if}
