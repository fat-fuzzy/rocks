<script lang="ts">
	import type {ActionTransform} from '$types'
	import ContentGrid from '$lib/ui/ContentGrid.svelte'

	const CTA: ActionTransform[] = ['analyze', 'engage']
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		analyze: `Get a Sense of Where You're At`,
		engage: 'Decide Where You are Going',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		analyze: 'Analyze',
		engage: 'Engage',
	}

	const currentPage = 'mycelium'
</script>

{#snippet description(action: string)}
	{#if action === 'analyze'}
		<p>Evaluate your situation.</p>
		<p>See what is working, and what isn't.</p>
	{:else if action === 'engage'}
		<p>Choose where to make improvements.</p>
		<p>Decide how to evaluate progress.</p>
		<p>Plan your next steps.</p>
	{/if}
{/snippet}

<div class="l:stack:xl w:full align:center">
	<h1 class="text:center">Mycelium</h1>
	<h2 class="text:center">Rhythm for Growth</h2>

	<ContentGrid
		page={currentPage}
		actions={CTA}
		links={CTA_LINK_LABELS}
		headings={CTA_TITLE}
		{description}
	/>
</div>
