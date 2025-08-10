<script lang="ts">
	import type {Filters, FiltersProps} from '$types'
	import ui from '@fat-fuzzy/ui'
	import {DEFAULT_FILTERS} from '$lib/components/sketch/definitions.js'

	const {ToggleMenu} = ui.recipes

	let {
		size = 'xs',
		channels,
		blur,
		convolutions,
		onupdate,
		disabled,
	}: FiltersProps = $props()

	let filters: Filters = $state(DEFAULT_FILTERS)

	let channelMenuItems = $derived(
		channels?.map((c) => ({
			id: c,
			label: c,
			name: c,
			title: '',
			value: c,
		})) || [],
	)

	let blurMenuItems = $derived(
		blur?.map((b) => ({
			id: String(b),
			label: `blur ${b}`,
			name: String(b),
			title: '',
			value: b,
		})) || [],
	)

	let effectMenuItems = $derived(
		convolutions?.map((b) => ({
			id: b,
			label: b,
			name: b,
			title: '',
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
		{disabled}
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
		{disabled}
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
		{disabled}
	/>
{/if}
