<script lang="ts">
	import type {ActionDoc} from '$types'
	import ContentGrid from '$lib/ui/ContentGrid.svelte'

	const CTA: ActionDoc[] = ['edit', 'build', 'compare', 'print']
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		edit: 'Edit the Content',
		build: 'Build the Structure',
		compare: 'Compare Presets',
		print: 'Save to PDF',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		edit: 'Edit',
		build: 'Structure',
		compare: 'Compare',
		print: 'Save & Print',
		data: 'Your data',
	}

	const currentPage = 'chlorophyll'
</script>

{#snippet description(action: string)}
	{#if action === 'edit'}
		<p>Focus on your core message.</p>
		<p>Make your voice heard.</p>
	{:else if action === 'build'}
		<p>Structure the narrative to convey your story.</p>
		<p>Save and modify Presets.</p>
	{:else if action === 'compare'}
		<p>Preview your work in progress.</p>
		<p>Compare doc content using Presets.</p>
	{:else if action === 'print'}
		<p>Save a document in PDF format.</p>
		<p>Print it using your browser.</p>
	{/if}
{/snippet}

<div class="l:stack:xl w:full align:center">
	<h1 class="text:center">Chlorophyll</h1>
	<h2 class="text:center">Carrier Bag of Story</h2>

	<ContentGrid
		page={currentPage}
		actions={CTA}
		links={CTA_LINK_LABELS}
		headings={CTA_TITLE}
		{description}
		color="accent"
	/>
</div>
