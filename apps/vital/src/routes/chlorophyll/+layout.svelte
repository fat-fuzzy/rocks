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
		metadata: coordinators.chlorophyll.coordMetadata,
		imports: coordinators.chlorophyll.coordImports,
		docs: coordinators.chlorophyll.coordDocs,
		exports: coordinators.chlorophyll.coordExports,
		presets: coordinators.chlorophyll.coordPresets,
	})
</script>

{@render children()}
