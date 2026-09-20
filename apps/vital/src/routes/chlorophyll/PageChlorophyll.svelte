<script lang="ts">
	import type {RouteNameFor} from '$types'
	import ContentGrid from '$lib/ui/ContentGrid.svelte'

	const currentPage = 'chlorophyll'

	const CTA: RouteNameFor<'chlorophyll'>[] = [
		'edit',
		'build',
		'compare',
		'preview',
	]
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		edit: 'Edit the Content',
		build: 'Build the Structure',
		compare: 'Compare Presets',
		preview: 'Preview, Save, Print',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		edit: 'Edit',
		build: 'Structure',
		compare: 'Compare',
		preview: 'Preview',
		data: 'Your data',
	}
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
	{:else if action === 'preview'}
		<p>Preview your document.</p>
		<p>Save or print it using your browser.</p>
	{/if}
{/snippet}

<div class="l:stack:xl w:full align:center">
	<h1 class="text:center">Chlorophyll</h1>
	<h2 class="text:center">Narrative Photosynthesis</h2>

	<ContentGrid
		page={currentPage}
		actions={CTA}
		links={CTA_LINK_LABELS}
		headings={CTA_TITLE}
		{description}
		color="accent"
	/>
</div>
