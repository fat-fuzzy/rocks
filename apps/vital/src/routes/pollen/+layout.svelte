<script lang="ts">
	import type {Coordinators} from '$types'

	import {getContext, setContext, type Snippet} from 'svelte'

	let {
		children,
	}: {
		children: Snippet
	} = $props()

	const coordinators: {
		[key: string]: Coordinators
	} = getContext('coordinators')

	setContext('currentCoordinators', {
		metadata: coordinators.pollen.coordMetadata,
		imports: coordinators.pollen.coordImports,
		docs: coordinators.pollen.coordDocs,
		exports: coordinators.pollen.coordExports,
		presets: coordinators.pollen.coordPresets,
	})
</script>

{@render children()}
