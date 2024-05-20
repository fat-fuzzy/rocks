<script lang="ts">
	import type {SceneMeta} from '$types'

	type Props = {
		meta: SceneMeta | undefined
		context: any
	}
	let {meta, context}: Props = $props()
	let sketchUi = $derived.by(() => {
		let ui = ['sketch', 'canvas', 'player']
		if (
			meta.controls?.length > 1 ||
			(meta.controls?.length === 1 && meta.controls[0] !== 'loop')
		) {
			ui = [...ui, 'controls']
		}
		return ui
	})
</script>

<aside class="debug l:stack:sm maki:block size:2xs overflow:x card:dotted">
	<table class="text:center font:sm" data-testid="debug-table">
		<thead class="bg:primary:300">
			<tr>
				<th class="bg:accent:300" scope="col">Debug</th>
				{#each sketchUi as ui}
					<th>{ui}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="text:center">
			<tr>
				<td
					class="bg:light justify:center l:flex nowrap align:center maki:block"
				>
					<span>Event</span>
					<span class="card:2xs bg:accent:100 variant:bare">prev</span>
					<span class="card:2xs bg:accent:000">current</span>
				</td>
				{#each sketchUi as ui}
					<td class="variant:outline" data-testid={`debug-event-${ui}`}>
						<div class="bg:light justify:center l:flex nowrap align:center">
							<span
								class="card:2xs bg:accent:100 variant:bare"
								data-testid="previous-event"
							>
								{context.getPreviousEvent()}
							</span>
							<span class="card:2xs bg:accent:000" data-testid="current-event">
								{context.getCurrentEvent()}
							</span>
						</div>
					</td>
				{/each}
			</tr>
			<tr class="bg:primary:000">
				<td class="bg:primary:000 variant:outline">State</td>
				{#each sketchUi as ui}
					<td class="variant:outline" data-testid={`debug-state-${ui}`}>
						{context.getState(ui)}
					</td>
				{/each}
			</tr>
			<tr class="bg:primary:100">
				<td class="bg:primary:100 variant:outline">Actions</td>
				{#each sketchUi as ui}
					<td class="variant:outline" data-testid={`debug-actions-${ui}`}>
						{context.getNextActions(ui)}
					</td>
				{/each}
			</tr>
		</tbody>
		<tfoot>
			<tr class="bg:accent:000">
				<td class="variant:outline">Feedback</td>
				{#each sketchUi as ui}
					<td class="variant:outline" data-testid={`debug-feedback-${ui}`}>
						{#if context.getFeedback(ui).length > 0}
							{@const feedbackSketch = context.getFeedback(ui)}
							{#each feedbackSketch as feedback}
								<div class={`feedback bg:${feedback.status} variant:bare`}>
									<p
										class={`status emoji:${feedback.status}`}
										data-testid={`feedback-status`}
									>
										{feedback.status}
									</p>
									<p data-testid={`feedback-message`}>{feedback.message}</p>
								</div>
							{/each}
						{/if}
					</td>
				{/each}
			</tr>
		</tfoot>
	</table>
</aside>

<style>
	@import '../../styles/css/debug.css';
</style>
