<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {selectedStore} from '../stores/api'

	export let title = ''
	export let component: ComponentType
	$: selected = $selectedStore
	$: size = selected.size ?? ''
	$: container = selected.container ? `l:${selected.container} inset` : ''
	$: layout = selected.layout ? `l:${selected.layout}` : ''
	$: breakpoint = selected.breakpoint ? `bp:${selected.breakpoint}` : ''
	$: contextClasses = `${container} ${layout} ${breakpoint} ${size}`
</script>

<div class={`${contextClasses}`}>
	<svelte:component this={component} id={title} {...selected} />
</div>
