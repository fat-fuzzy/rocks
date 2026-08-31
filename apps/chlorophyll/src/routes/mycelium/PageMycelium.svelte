<script lang="ts">
	import type {ActionTransform} from '$types'
	import ContentGrid from '$lib/ui/ContentGrid.svelte'
	import DialogData from '$lib/ui/controls/data/DialogData.svelte'

	const CTA: ActionTransform[] = ['analyze', 'engage', 'data']
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		analyze: `Get a Sense of Where You're At`,
		engage: 'Decide Where You are Going',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		analyze: 'Analyze',
		engage: 'Engage',
		data: 'Your data',
	}

	const currentPage = 'mycelium'
</script>

{#snippet description(action: string)}
	{#if action === 'analyze'}
		<p>Evaluate your situation.</p>
		<p>See what is working, and what isn't.</p>
	{:else if action === 'engage'}
		<p>Choose where to make improvements.</p>
		<p>Plan concrete steps.</p>
		<p>Decide how to evaluate progress.</p>
	{:else if action === 'data'}
		<p>Your data lives in your browser.</p>
		<p>Export it for backup as JSON.</p>
		<p>Restore content from a backup.</p>
		<hr class="maki:block:lg" />
		<div class="l:stack">
			<DialogData
				id="button-import"
				label="Manage Data"
				color="primary"
				font="sm"
			/>
		</div>
	{/if}
{/snippet}

<div class="l:stack:xl w:full align:center">
	<h1 class="text:center">Mycelium is Vital</h1>
	<h2 class="text:center">Pulses to Rhythm your Growth</h2>
	<div class="w:auto">
		<ContentGrid
			page={currentPage}
			actions={CTA}
			links={CTA_LINK_LABELS}
			headings={CTA_TITLE}
			{description}
		/>
	</div>
</div>
