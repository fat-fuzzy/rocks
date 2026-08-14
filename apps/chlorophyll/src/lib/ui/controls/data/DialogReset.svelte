<script lang="ts">
	import type {UiColor, UiSize} from '@fat-fuzzy/ui'
	import type {ImportStatus, IImportService} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import {SvelteURL} from 'svelte/reactivity'

	const {Button, Feedback} = ui.blocks

	interface Props {
		id: string
		label?: string
		color?: UiColor
		size?: UiSize
		font?: UiSize
	}
	let {
		id,
		label = 'Reset Data',
		color = 'primary',
		size = '2xs',
		font = '2xs',
	}: Props = $props()

	let importService: IImportService = getContext('importService')

	const statusLabel: Record<ImportStatus, string> = {
		idle: '',
		deleting: 'Deleting storage...',
		ready: 'Ready to import',
		'backing-up': 'Backing up...',
		importing: 'Importing...',
		done: 'Imported!',
		error: 'Error',
	}
	let errorMessage = $state('')
	let status: ImportStatus | undefined = $state()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'sm',
			color,
			label: 'Reset Data',
			position: 'nord-est',
			children: presetInfo,
		})

		dialogActor.show()
	}

	/**
	 * Back up current content to filesystem
	 */
	async function deleteData() {
		status = 'deleting'

		// 2. Delete existing storage: the import replaces OPFS content
		await importService.deleteAllContent()

		status = 'ready'
	}

	/**
	 * Restore OPFS content from seed markdowns
	 */
	async function freshStart() {
		await deleteData()

		await importService.initSeed(
			{
				base: {
					schema_version: '0.1',
					languages: ['en'],
					formats: ['long', 'short'],
					tags: [
						{
							title: 'Twilight Z',
							name: 'twilight-z',
							items: ['draft', 'hidden', 'untagged'],
						},
					],
					settings: [],
				},
				structures: [
					{
						schema_version: '0.1',
						format: 'long',
						sections: [],
					},
					{
						schema_version: '0.1',
						format: 'short',
						sections: [],
					},
				],
			},
			[
				{
					schema_version: '0.1',
					seed_type: 'root',
					language: 'en',
					format: 'long',
					sections: [[]],
				},
				{
					schema_version: '0.1',
					seed_type: 'root',
					language: 'en',
					format: 'short',
					sections: [[]],
				},
			],
		)

		const newUrl = new SvelteURL(page.url)
		newUrl.search = ''

		window.location.href = newUrl.href

		dialogActor.close()
	}

	/**
	 * Restore OPFS content from seed markdowns
	 */
	async function reSeed() {
		await deleteData()

		await importService.init(
			{base: page.data.base, structures: page.data.structures},
			page.data.seed,
		)

		window.location.href = '' // FIXME: hacky solution to reload for now

		dialogActor.close()
	}
</script>

{#snippet presetInfo()}
	<form class="raviolink l:stack:lg" enctype="multipart/form-data">
		<Feedback context="prose" variant="bare" size="xs" font="sm" asset="none">
			<h4 class="font:sm font:heading">Choose a reset mode</h4>
			<ul class="unstyled">
				<li>
					<span class="font:semibold">Fresh Start</span> will delete all content.
				</li>
				<li>
					<span class="font:semibold">Seed Demo</span> will restore demo data.
				</li>
			</ul>
			<hr />
			<p>Both operations will delete current data.</p>
		</Feedback>

		<div class="l:stack:lg">
			<div class="w:full l:flex size:3xs justify:between">
				<div class="l:flex size:3xs justify:between grow">
					<Button
						type="button"
						label="Fresh Start"
						id="button-fresh-start"
						name=""
						{color}
						variant="outline"
						shape="mellow"
						size="2xs"
						font="2xs font:heading"
						onclick={freshStart}
					/>
					<Button
						type="button"
						label="Seed Demo"
						id="button-seed"
						name=""
						{color}
						shape="mellow"
						variant="outline"
						size="2xs"
						font="2xs font:heading"
						onclick={reSeed}
					/>
				</div>
			</div>
			{#if status}
				<Feedback
					status="success"
					context="prose"
					variant="bare"
					size="xs"
					font="sm"
					asset="default"
				>
					<output class="w:full text:center">
						{statusLabel[status]}
					</output>
				</Feedback>
				{#if status === 'error'}
					<Feedback
						status="error"
						context="prose"
						variant="bare"
						size="xs"
						font="sm"
						asset="default"
					>
						<output class="w:full text:center">{errorMessage}</output>
					</Feedback>
				{/if}
			{/if}
		</div>
	</form>
{/snippet}

<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{color}
	layout="flex"
	justify="between nowrap"
	align="center"
	shape="mellow"
	variant="outline"
	onclick={showDialog}
>
	<span class="font:heading">{label}</span>
	<ff-con class={`svg:leaf reverse:y size:${size} l:flex`}></ff-con>
</Button>
