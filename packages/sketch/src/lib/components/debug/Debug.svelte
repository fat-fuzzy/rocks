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

<aside class="debug l:stack:sm maki:block">
	<table class="text:center font:sm" data-testid="debug-table">
		<thead class="surface:3:primary">
			<tr>
				<th class="surface:3:accent" scope="col">Debug</th>
				{#each sketchUi as ui}
					<th>{ui}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="text:center">
			<tr>
				<td
					class="justify:center l:flex size:xs nowrap align:center maki:block"
				>
					<span>Event</span>
					<span class="ravioli:3xs surface:2:accent variant:bare">prev</span>
					<span class="ravioli:3xs surface:1:accent">current</span>
				</td>
				{#each sketchUi as ui}
					<td class="variant:outline" data-testid={`debug-event-${ui}`}>
						<div class="justify:center l:flex nowrap align:center">
							<span
								class="ravioli:3xs surface:2:accent variant:bare"
								data-testid="previous-event"
							>
								{context.getPreviousEvent()}
							</span>
							<span
								class="ravioli:2xs surface:1:accent"
								data-testid="current-event"
							>
								{context.getCurrentEvent()}
							</span>
						</div>
					</td>
				{/each}
			</tr>
			<tr class="surface:1:primary">
				<td class="surface:1:primary variant:outline">State</td>
				{#each sketchUi as ui}
					<td class="variant:outline" data-testid={`debug-state-${ui}`}>
						{context.getState(ui)}
					</td>
				{/each}
			</tr>
			<tr class="surface:2:primary">
				<td class="surface:2:primary variant:outline">Actions</td>
				{#each sketchUi as ui}
					<td class="variant:outline" data-testid={`debug-actions-${ui}`}>
						{context.getNextActions(ui)}
					</td>
				{/each}
			</tr>
		</tbody>
		<tfoot>
			<tr class="surface:1:accent">
				<td class="surface:1:accent variant:outline">Feedback</td>
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
