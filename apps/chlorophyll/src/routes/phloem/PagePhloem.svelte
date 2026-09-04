<script lang="ts">
	import type {ActionResource} from '$types'

	import ContentGrid from '$lib/ui/ContentGrid.svelte'

	const CTA: ActionResource[] = ['write', 'reflect', 'explore']
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		write: 'Start writing',
		reflect: 'Organize your Resources',
		explore: 'Pick a Pathway to Explore',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		write: 'Write',
		reflect: 'Reflect',
		explore: 'Explore',
	}

	const currentPage = 'phloem'
</script>

{#snippet description(action: string)}
	{#if action === 'write'}
		<p>Take the time to build resources.</p>
		<p>
			Write a <a href="https://jvns.ca/blog/brag-documents/">
				brag document
			</a>.
		</p>
		<p>Nourish of yourself.</p>
	{:else if action === 'reflect'}
		<p>Reflect on what motivates you.</p>
		<p>Clarify your objectives.</p>
		<p>Save and modify Pathways.</p>
	{:else if action === 'explore'}
		<p>Overview and compare Pathways.</p>
		<p>Breathe and decide what's next !</p>
	{/if}
{/snippet}

<div class="l:stack:xl w:full align:center">
	<h1 class="text:center">Phloem</h1>
	<h2 class="text:center">Fountain of Thought</h2>

	<ContentGrid
		page={currentPage}
		actions={CTA}
		links={CTA_LINK_LABELS}
		headings={CTA_TITLE}
		{description}
		color="info"
	/>
</div>
