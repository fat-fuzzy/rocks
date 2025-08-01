<script lang="ts">
	import type {GridControlProps} from '$types'
	import ui from '@fat-fuzzy/ui'
	import actor from '$lib/components/sketch/actor.svelte'

	const {ToggleMenu} = ui.recipes

	let {size = 'xs', onupdate, gridItems}: GridControlProps = $props()

	let gridMenuItems = $derived(
		gridItems?.map((c) => ({
			id: c,
			name: c,
			title: c,
			value: c,
		})) || [],
	)

	let items: string[] = $state([])

	function loadGrid(selected: {name: string}[]) {
		if (selected.length > 0) {
			items = selected.map((s) => s.name)
		} else {
			items = []
		}
	}

	function updateGrid(selected: {name: string}[]) {
		loadGrid(selected)
		onupdate(items)
	}
</script>

<ToggleMenu
	id="channels"
	{size}
	mode="radio"
	layout="switcher"
	color="primary"
	variant="bare"
	items={gridMenuItems}
	onupdate={updateGrid}
	init={loadGrid}
	disabled={actor.getSketchDisabled()}
/>
