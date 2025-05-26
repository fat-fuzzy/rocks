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
			meta?.controls &&
			(meta.controls.length > 1 ||
				(meta.controls.length === 1 && meta.controls[0] !== 'loop'))
		) {
			ui = [...ui, 'controls']
		}
		return ui
	})
</script>

<details class="debug">
	<summary class="ravioli:3xs font:heading font:sm color:primary variant:bare">
		Debug
	</summary>
	<div class="maki:block scroll:x text:center">
		<table class="text:center font:sm" data-testid="debug-table">
			<thead class="ravioli:3xs surface:3:primary">
				<tr>
					<th class="surface:3:accent" scope="col">Event</th>
					{#each sketchUi as ui}
						<th>{ui}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="text:center">
				<tr>
					<td class="ravioli:3xs">
						<div class="l:stack:2xs">
							<span class="ravioli:3xs surface:2:accent">current</span>
							<span class="ravioli:3xs surface:1:accent">prev</span>
						</div>
					</td>
					{#each sketchUi as ui}
						<td class="ravioli:3xs" data-testid={`debug-event-${ui}`}>
							<div class="l:stack:2xs">
								<span
									class="ravioli:2xs surface:2:accent"
									data-testid="current-event"
								>
									{context.getCurrentEvent()}
								</span>
								<span
									class="ravioli:3xs surface:1:accent"
									data-testid="previous-event"
								>
									{context.getPreviousEvent()}
								</span>
							</div>
						</td>
					{/each}
				</tr>
				<tr class="ravioli:3xs surface:1:primary">
					<td class="ravioli:3xs surface:1:primary variant:outline">State</td>
					{#each sketchUi as ui}
						<td class="variant:outline" data-testid={`debug-state-${ui}`}>
							{context.getState(ui)}
						</td>
					{/each}
				</tr>
				<tr class="ravioli:3xs surface:2:primary">
					<td class="surface:2:primary variant:outline">Actions</td>
					{#each sketchUi as ui}
						<td class="variant:outline" data-testid={`debug-actions-${ui}`}>
							{context.getNextActions(ui)}
						</td>
					{/each}
				</tr>
			</tbody>
			<tfoot>
				<tr class="ravioli:3xs surface:1:accent">
					<td class="ravioli:3xs surface:1:accent variant:outline">Feedback</td>
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
	</div>
</details>
