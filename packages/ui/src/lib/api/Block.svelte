<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './styles-api'
	import {selectedStore} from '../stores/api'

	export let uiState: StyleTree // TODO: figure out how to avoid this prop drilling
	export let title = ''
	export let component: ComponentType

	let selected = uiState

	$: selected = $selectedStore
	$: styles = selected.blocks?.element ?? {}
</script>

<svelte:component this={component} id={title} {...styles} />
