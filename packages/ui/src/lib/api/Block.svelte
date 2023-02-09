<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {selectedBlock} from '../stores/api'

	export let title = ''
	export let component: ComponentType
</script>

<svelte:component this={component} id={title} {...$selectedBlock} />
