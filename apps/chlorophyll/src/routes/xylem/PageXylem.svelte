<script lang="ts">
	import ContentGrid from '$lib/ui/ContentGrid.svelte'
	import DialogData from '$lib/ui/controls/data/DialogData.svelte'
	import type {ActionResource} from '$types'

	const CTA: ActionResource[] = ['write', 'reflect', 'experiment', 'data']
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		write: 'Start writing',
		reflect: 'Organize your Resources',
		experiment: 'Preview and Compare Pathways',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		write: 'Write',
		reflect: 'Reflect',
		experiment: 'Experiment',
		data: 'Your data',
	}

	const currentPage = 'xylem'
</script>

{#snippet description(action: string)}
	{#if action === 'write'}
		<p>Build your resources.</p>
		<p>Nourish yourself.</p>
		<p>
			Write a <a href="https://jvns.ca/blog/brag-documents/" class="font:sm">
				brag document
			</a>.
		</p>
	{:else if action === 'reflect'}
		<p>Reflect on your experiences.</p>
		<p>Structure your resources to fit your needs.</p>
		<p>Save and modify Pathways.</p>
	{:else if action === 'experiment'}
		<p>Overview and compare Pathways.</p>
		<p>Take a breath and decide what's next !</p>
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

<section class="l:stack:xl w:full">
	<h2 class="text:center">A space to Gather your Thoughts</h2>
	<ContentGrid
		page={currentPage}
		actions={CTA}
		links={CTA_LINK_LABELS}
		headings={CTA_TITLE}
		{description}
	/>
</section>
