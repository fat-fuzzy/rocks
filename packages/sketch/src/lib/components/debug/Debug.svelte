<script lang="ts">
	import type {SceneMeta} from '$types'

	type Props = {
		meta: SceneMeta | undefined
		context: any
	}
	let {meta, context}: Props = $props()
</script>

<aside class="debug l:stack:sm maki:block size:xs overflow:x card:dotted">
	<table class="text:center">
		<thead class="bg:primary:300">
			<tr>
				<th class="bg:accent:300" scope="col">Debug</th>
				<th colspan="2">Sketch</th>
				<th colspan="2">Canvas</th>
				<th colspan="2">Player</th>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<th colspan="2">Controls</th>
				{/if}
			</tr>
		</thead>
		<tbody class="text:center">
			<tr class="bg:accent:000">
				<td class="bg:lighttext:center l:stack:2xs card:sm">
					<span>Event</span>
					<div class="l:flex nowrap">
						<span class="card:2xs bg:accent:100">Previous</span>
						<span class="card:2xs bg:primary:100">Current</span>
					</div>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:accent:100">
						{context.getEvent('previous')}
					</span>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:primary:100">
						{context.getEvent('current')}
					</span>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:accent:100">
						{context.getEvent('previous')}
					</span>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:primary:100">
						{context.getEvent('current')}
					</span>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:accent:100">
						{context.getEvent('previous')}
					</span>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:primary:100">
						{context.getEvent('current')}
					</span>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:accent:100">
						{context.getEvent('previous')}
					</span>
				</td>
				<td class="variant:outline">
					<span class="card:2xs bg:primary:100">
						{context.getEvent('current')}
					</span>
				</td>
			</tr>
			<tr class="bg:primary:000">
				<td class="bg:primary:000 variant:outline">State</td>
				<td class="variant:outline" colspan="2">
					{context.getState('sketch')}
				</td>
				<td class="variant:outline" colspan="2">
					{context.getState('canvas')}
				</td>
				<td class="variant:outline" colspan="2">
					{context.getState('player')}
				</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<td class="variant:outline" colspan="2">
						{context.getState('controls')}
					</td>
				{/if}
			</tr>
			<tr class="bg:primary:100">
				<td class="bg:primary:100 variant:outline">Actions</td>
				<td class="variant:outline" colspan="2">
					{context.getNextActions('sketch')}
				</td>
				<td class="variant:outline" colspan="2">
					{context.getNextActions('canvas')}
				</td>
				<td class="variant:outline" colspan="2">
					{context.getNextActions('player')}
				</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<td class="variant:outline" colspan="2">
						{context.getNextActions('controls')}
					</td>
				{/if}
			</tr>
		</tbody>
		<tfoot>
			<tr class="bg:accent:000">
				<td class="variant:outline">Feedback</td>
				<td
					class={`variant:outline ${
						context.getErrors('sketch').length > 0 ? 'bg:danger:100' : ''
					}`}
					colspan="2"
				>
					{context.getErrors('sketch')}
				</td>
				<td
					class={`variant:outline ${
						context.getErrors('sketch').length > 0 ? 'bg:danger:100' : ''
					}`}
					colspan="2"
				>
					{context.getErrors('canvas')}
				</td>
				<td
					class={`variant:outline ${
						context.getErrors('sketch').length > 0 ? 'bg:danger:100' : ''
					}`}
					colspan="2"
				>
					{context.getErrors('player')}
				</td>
				{#if meta?.type === 'matrix-2d' || meta?.type === 'matrix-3d' || meta?.type === 'texture'}
					<td
						class={`variant:outline ${
							context.getErrors('sketch').length > 0 ? 'bg:danger:100' : ''
						}`}
						colspan="2"
					>
						{context.getErrors('controls')}
					</td>
				{/if}
			</tr>
		</tfoot>
	</table>
</aside>
