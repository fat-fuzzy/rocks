<script lang="ts">
	import type {ActionResource} from '$types'

	import ContentGrid from '$lib/ui/ContentGrid.svelte'
	import DialogData from '$lib/ui/controls/data/DialogData.svelte'

	const CTA: ActionResource[] = ['write', 'reflect', 'explore', 'data']
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		write: 'Start writing',
		reflect: 'Organize your Resources',
		explore: 'Pick a Pathway to Explore',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		write: 'Write',
		reflect: 'Reflect',
		explore: 'Explore',
		data: 'Your data',
	}

	const currentPage = 'phloem'
</script>

{#snippet description(action: string)}
	{#if action === 'write'}
		<p>Build up your resources: take care of yourself.</p>
		<p>
			Write a <a href="https://jvns.ca/blog/brag-documents/" class="font:sm">
				brag document
			</a>.
		</p>
	{:else if action === 'reflect'}
		<p>Reflect on your experiences.</p>
		<p>Structure your resources to fit your needs.</p>
		<p>Save and modify Pathways.</p>
	{:else if action === 'explore'}
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
				color="info"
				font="sm"
			/>
		</div>
	{/if}
{/snippet}

<div class="l:stack:xl w:full align:center">
	<h1 class="text:center">Phloem is Vital</h1>
	<h2 class="text:center">Thoughts to Nourish your Actions</h2>
	<div class="w:auto">
		<ContentGrid
			page={currentPage}
			actions={CTA}
			links={CTA_LINK_LABELS}
			headings={CTA_TITLE}
			{description}
			color="info"
		/>
	</div>
</div>
