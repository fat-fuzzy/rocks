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
				<th colspan="2">Sketch</th>
				<th colspan="2">Canvas</th>
				<th colspan="2">Player</th>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<th colspan="2">Controls</th>
				{/if}
			</tr>
		</thead>
		<tbody class="text:center">
			<tr class="bg:accent:000 text:center">
				<td class="bg:lighttext:center l:stack:2xs card:sm">
					<span>Event</span>
					<div>
						<span class="card:2xs bg:accent:100">Previous</span>
						<span class="card:2xs bg:primary:100">Current</span>
					</div>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:accent:100">{sketchEvents['previous']}</span>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:primary:100">{sketchEvents['current']}</span>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:accent:100">{sketchEvents['previous']}</span>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:primary:100">{sketchEvents['current']}</span>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:accent:100">{sketchEvents['previous']}</span>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:primary:100">{sketchEvents['current']}</span>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:accent:100">{sketchEvents['previous']}</span>
				</td>
				<td class="variant:outline card:sm">
					<span class="card:2xs bg:primary:100">{sketchEvents['current']}</span>
				</td>
			</tr>
			<tr class="bg:primary:000">
				<td class="bg:primary:000 text:end variant:outline">State</td>
				<td class="variant:outline" colspan="2">{sketchState.sketch}</td>
				<td class="variant:outline" colspan="2">{sketchState.canvas}</td>
				<td class="variant:outline" colspan="2">{sketchState.player}</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<td class="variant:outline" colspan="2">{sketchState.geometry}</td>
				{/if}
			</tr>
			<tr class="bg:primary:100 text:center">
				<td class="bg:primary:100 text:end variant:outline">Actions</td>
				<td class="variant:outline" colspan="2">
					{sketchActions['sketch'][sketchState.sketch]}
				</td>
				<td class="variant:outline" colspan="2">
					{sketchActions['canvas'][sketchState.canvas]}
				</td>
				<td class="variant:outline" colspan="2">
					{sketchActions['player'][sketchState.player]}
				</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<td class="variant:outline" colspan="2">
						{sketchActions['geometry'][sketchState.geometry]}
					</td>
				{/if}
			</tr>
		</tbody>
		<tfoot>
			<tr class="bg:danger:000 text:center">
				<td class="bg:danger:100 text:end variant:outline">Errors</td>
				<td class="variant:outline" colspan="2">TODO</td>
				<td class="variant:outline" colspan="2">TODO</td>
				<td class="variant:outline" colspan="2">TODO</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<td class="variant:outline" colspan="2">TODO</td>
				{/if}
			</tr>
		</tfoot>
	</table>
</aside>
