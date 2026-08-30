<script lang="ts">
	import {resolve} from '$app/paths'

	import DialogData from '$lib/ui/controls/data/DialogData.svelte'

	const CTA = ['edit', 'build', 'preview']
	const CTA_LINK_LABELS: {[cta: string]: string} = {
		edit: 'Edit the Content',
		build: 'Build the Structure',
		preview: 'Compare Pathways',
	}

	const CTA_TITLE: {[cta: string]: string} = {
		edit: 'Content',
		build: 'Structure',
		preview: 'Compare',
		io: 'Your data',
	}

	const CTA_DESCRIPTIONS: {[cta: string]: string[]} = {
		edit: ['Build your resources.', 'Nourish yourself.'],
		build: [
			'Structure resources to fit your needs.',
			'Save and modify pathways.',
		],
		preview: ['Preview notes', 'Compare doc content as pathways.'],
		io: [
			'Your data lives in your browser.',
			'Export it for backup as JSON.',
			'Restore content from a backup.',
		],
	}
</script>

<section class="l:stack:xl w:full">
	<h2>What can you do from here</h2>
	<ul class="l:grid:auto size:sm w:full">
		{#each CTA as action, i (i)}
			<li
				class="l:stack align:start justify:between color:neutral surface:1:neutral shape:soft ravioli:md"
			>
				<h3 class="w:full font:sm">
					{CTA_TITLE[action]}
				</h3>
				<div class="l:flex:3xs w:full font:sm">
					{#each CTA_DESCRIPTIONS[action] as description, i (i)}
						<p>{description}</p>
					{/each}
				</div>
				<div class="l:stack w:full">
					<a
						href={resolve(`/xylem/${action}`)}
						class="l:flex w:full font:heading font:sm justify:center raviolink color:primary surface:2:primary shape:mellow"
					>
						{CTA_LINK_LABELS[action]}
					</a>
				</div>
			</li>
		{/each}
		<li
			class="l:stack:lg align:start justify:between color:neutral surface:1:neutral shape:soft ravioli:md"
		>
			<div class="l:flex:3xs w:full font:sm">
				<h3 class="w:full">
					{CTA_TITLE['io']}
				</h3>
				{#each CTA_DESCRIPTIONS['io'] as description, i (i)}
					<p>{description}</p>
				{/each}
			</div>

			<div class="l:flex justify:around w:full">
				<DialogData
					id="button-import"
					label="Manage Data"
					color="primary"
					font="sm"
				/>
			</div>
		</li>
	</ul>
</section>
