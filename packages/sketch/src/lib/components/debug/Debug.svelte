<script lang="ts">
	import type {SceneMeta} from '$types'

	type Props = {
		meta: SceneMeta | undefined
		context: any
	}
	let {meta, context}: Props = $props()
</script>

<aside class="debug l:stack:sm maki:block size:2xs overflow:x card:dotted">
	<table class="text:center font:sm">
		<thead class="bg:primary:300">
			<tr>
				<th class="bg:accent:300" scope="col">Debug</th>
				<th>Sketch</th>
				<th>Canvas</th>
				<th>Player</th>
				{#if meta.controls.length > 1 || (meta.controls.length === 1 && meta.controls[0] !== 'loop')}
					<th>Controls</th>
				{/if}
			</tr>
		</thead>
		<tbody class="text:center">
			<tr>
				<td class="bg:light justify:center l:flex nowrap align:center card:sm">
					<span>Event</span>
					<span class="card:2xs bg:accent:100 variant:bare">prev</span>
					<span class="card:2xs bg:accent:000">current</span>
				</td>
				<td class="variant:outline">
					<div
						class="bg:light justify:center l:flex nowrap align:center card:sm"
					>
						<span class="card:2xs bg:accent:100 variant:bare">
							{context.getPreviousEvent()}
						</span>
						<span class="card:2xs bg:accent:000">
							{context.getCurrentEvent()}
						</span>
					</div>
				</td>
				<td class="variant:outline">
					<div
						class="bg:light justify:center l:flex nowrap align:center card:sm"
					>
						<span class="card:2xs bg:accent:100 variant:bare">
							{context.getPreviousEvent()}
						</span>
						<span class="card:2xs bg:accent:000">
							{context.getCurrentEvent()}
						</span>
					</div>
				</td>
				<td class="variant:outline">
					<div
						class="bg:light justify:center l:flex nowrap align:center card:sm"
					>
						<span class="card:2xs bg:accent:100 variant:bare">
							{context.getPreviousEvent()}
						</span>
						<span class="card:2xs bg:accent:000">
							{context.getCurrentEvent()}
						</span>
					</div>
				</td>
				{#if meta.controls.length > 1 || (meta.controls.length === 1 && meta.controls[0] !== 'loop')}
					<td class="variant:outline">
						<div
							class="bg:light justify:center l:flex nowrap align:center card:sm"
						>
							<span class="card:2xs bg:accent:100 variant:bare">
								{context.getPreviousEvent()}
							</span>
							<span class="card:2xs bg:accent:000">
								{context.getCurrentEvent()}
							</span>
						</div>
					</td>
				{/if}
			</tr>
			<tr class="bg:primary:000">
				<td class="bg:primary:000 variant:outline">State</td>
				<td class="variant:outline">
					{context.getState('sketch')}
				</td>
				<td class="variant:outline">
					{context.getState('canvas')}
				</td>
				<td class="variant:outline">
					{context.getState('player')}
				</td>
				{#if meta.controls.length > 1 || (meta.controls.length === 1 && meta.controls[0] !== 'loop')}
					<td class="variant:outline">
						{context.getState('controls')}
					</td>
				{/if}
			</tr>
			<tr class="bg:primary:100">
				<td class="bg:primary:100 variant:outline">Actions</td>
				<td class="variant:outline">
					{context.getNextActions('sketch')}
				</td>
				<td class="variant:outline">
					{context.getNextActions('canvas')}
				</td>
				<td class="variant:outline">
					{context.getNextActions('player')}
				</td>
				{#if meta.controls.length > 1 || (meta.controls.length === 1 && meta.controls[0] !== 'loop')}
					<td class="variant:outline">
						{context.getNextActions('controls')}
					</td>
				{/if}
			</tr>
		</tbody>
		<tfoot>
			<tr class="bg:accent:000">
				<td class="variant:outline">Feedback</td>
				<td class="variant:outline">
					{#if context.getFeedback('sketch').length > 0}
						{@const feedbackSketch = context.getFeedback('sketch')}
						{#each feedbackSketch as feedback}
							<div class={`feedback bg:${feedback.status} variant:bare`}>
								<p class={`status emoji:${feedback.status}`}>
									{feedback.status}
								</p>
								<p>{feedback.message}</p>
							</div>
						{/each}
					{/if}
				</td>
				<td class="variant:outline">
					{#if context.getFeedback('canvas').length > 0}
						{@const feedbackSketch = context.getFeedback('canvas')}
						{#each feedbackSketch as feedback}
							<div class={`feedback bg:${feedback.status} variant:bare`}>
								<p class={`status emoji:${feedback.status}`}>
									{feedback.status}
								</p>
								<p>{feedback.message}</p>
							</div>
						{/each}
					{/if}
				</td>
				<td class="variant:outline">
					{#if context.getFeedback('player').length > 0}
						{@const feedbackSketch = context.getFeedback('player')}
						{#each feedbackSketch as feedback}
							<div class={`feedback bg:${feedback.status} variant:bare`}>
								<p class={`status emoji:${feedback.status}`}>
									{feedback.status}
								</p>
								<p>{feedback.message}</p>
							</div>
						{/each}
					{/if}
				</td>
				{#if meta.controls.length > 1 || (meta.controls.length === 1 && meta.controls[0] !== 'loop')}
					<td class="variant:outline">
						{#if context.getFeedback('controls').length > 0}
							{@const feedbackSketch = context.getFeedback('controls')}
							{#each feedbackSketch as feedback}
								<div class={`feedback bg:${feedback.status} variant:bare`}>
									<p class={`status emoji:${feedback.status}`}>
										{feedback.status}
									</p>
									<p>{feedback.message}</p>
								</div>
							{/each}
						{/if}
					</td>
				{/if}
			</tr>
		</tfoot>
	</table>
</aside>

<style>
	@import '../../styles/css/debug.css';
</style>
