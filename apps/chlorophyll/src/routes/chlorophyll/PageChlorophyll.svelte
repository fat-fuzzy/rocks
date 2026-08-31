<script lang="ts">
	import type {ActionDoc} from '$types'
	import ContentGrid from '$lib/ui/ContentGrid.svelte'
	import DialogData from '$lib/ui/controls/data/DialogData.svelte'

	const CTA: ActionDoc[] = ['edit', 'build', 'compare', 'print', 'data']
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
		<p>Structure content to tell your story.</p>
		<p>Save and modify Presets.</p>
	{:else if action === 'compare'}
		<p>Preview your work in progress.</p>
		<p>Compare doc content using Presets.</p>
	{:else if action === 'print'}
		<p>Save to PDF using your browser.</p>
	{:else if action === 'data'}
		<p>Your data lives in your browser.</p>
		<p>Export it for backup as JSON.</p>
		<p>Restore content from a backup.</p>

		<hr class="maki:block:lg" />
		<div class="l:stack">
			<DialogData
				id="button-import"
				label="Manage Data"
				color="accent"
				font="sm"
			/>
		</div>
	{/if}
{/snippet}

<div class="l:stack:xl w:full align:center">
	<h1 class="text:center">Chlorophyll is Vital</h1>
	<h2 class="text:center">Tools to Convey Your Story</h2>
	<div class="w:auto">
		<ContentGrid
			page={currentPage}
			actions={CTA}
			links={CTA_LINK_LABELS}
			headings={CTA_TITLE}
			{description}
			color="accent"
		/>
	</div>
</div>
