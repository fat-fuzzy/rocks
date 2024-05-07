<script lang="ts">
	import type {SceneMeta} from '$types'
	import {
		sketchActions,
		sketchState,
		sketchEvents,
	} from '$lib/components/sketch/store.svelte'

	type Props = {
		meta: SceneMeta | undefined
	}
	let {meta}: Props = $props()
</script>

<aside class="debug l:stack:sm maki:block size:xs overflow:x card:dotted">
	<table>
		<thead class="bg:primary:300">
			<tr>
				<th class="bg:light"></th>
				<th>Sketch</th>
				<th>Canvas</th>
				<th>Player</th>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d'}
					<th>Geometry</th>
				{/if}
			</tr>
		</thead>
		<tbody class="text:center">
			<tr class="bg:primary:000">
				<td class="bg:primary:100 text:end">State</td>
				<td class="variant:outline">{sketchState.sketch}</td>
				<td class="variant:outline">{sketchState.canvas}</td>
				<td class="variant:outline">{sketchState.player}</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d'}
					<td class="variant:outline">{sketchState.geometry}</td>
				{/if}
			</tr>
			<tr class="bg:primary:000 text:center">
				<td class="bg:primary:100 text:end">Actions</td>
				<td class="variant:outline">
					{sketchActions['sketch'][sketchState.sketch]}
				</td>
				<td class="variant:outline">
					{sketchActions['canvas'][sketchState.canvas]}
				</td>
				<td class="variant:outline">
					{sketchActions['player'][sketchState.player]}
				</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d'}
					<td class="variant:outline">
						{sketchActions['geometry'][sketchState.geometry]}
					</td>
				{/if}
			</tr>
		</tbody>
		<tfoot>
			<tr class="bg:danger:000 text:center">
				<td class="bg:danger:100 text:end">Errors</td>
				<td class="variant:outline">TODO</td>
				<td class="variant:outline">TODO</td>
				<td class="variant:outline">TODO</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d'}
					<td class="variant:outline">TODO</td>
				{/if}
			</tr>
		</tfoot>
	</table>
	<table>
		<thead class="bg:accent:300">
			<tr>
				<th class="bg:light"></th>
				<th>Previous</th>
				<th>Current</th>
			</tr>
		</thead>
		<tbody class="bg:primary:000 text:center">
			<tr class="bg:accent:000 text:center">
				<td class="bg:accent:100 text:end">Event</td>
				<td class="variant:outline">{sketchEvents['previous']}</td>
				<td class="variant:outline">{sketchEvents['current']}</td>
			</tr>
		</tbody>
	</table>
</aside>
