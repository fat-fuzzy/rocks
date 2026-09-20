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
		metadata: coordinators.phloem.coordMetadata,
		imports: coordinators.phloem.coordImports,
		docs: coordinators.phloem.coordDocs,
		exports: coordinators.phloem.coordExports,
		presets: coordinators.phloem.coordPresets,
	})
</script>

{@render children()}
