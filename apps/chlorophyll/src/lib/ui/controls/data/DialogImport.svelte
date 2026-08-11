<script lang="ts">
	import type {UiColor, UiSize} from '@fat-fuzzy/ui'
	import type {ImportStatus, IImportService, IExportService} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {guardedExport} from '$lib/common/download'
	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'

	const {Button, Feedback} = ui.blocks

	interface Props {
		id: string
		label?: string
		color?: UiColor
		size?: UiSize
		font?: UiSize
		onImported?: () => void // hook for parent to refresh state
	}
	let {
		id,
		label = 'Save Backup',
		color = 'primary',
		size = '2xs',
		font = '2xs',
		onImported,
	}: Props = $props()

	let importService: IImportService = getContext('importService')
	let exportService: IExportService = getContext('exportService')

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
	let fileInput: HTMLInputElement
	let status: ImportStatus | undefined = $state()

	let disabled: boolean = $derived(
		status === 'backing-up' || status === 'deleting' || status === 'importing',
	)

	let withBackup = $state(true)

	async function handleFileSelected(event: Event) {
		const target = event.target as HTMLInputElement

		const file = target.files?.[0]

		if (!file) return

		try {
			const serialized = await file.text() // read the file — parse happens inside importFromFile

			// 2. Import and write data
			status = 'importing'
			await importService.importFromJSON(serialized)

			status = 'done'

			// 3. TODO: tell parent to reload from OPFS
			onImported?.()

			window.location.href = '' // FIXME: hacky solution to reload for now
		} catch (error) {
			status = 'error'
			errorMessage = error instanceof Error ? error.message : 'Import failed'

			throw new Error('Import error', {cause: error})
		} finally {
			// 4. Reset input so the same file can be re-selected if needed
			target.value = ''
			status = undefined
			dialogActor.close()
		}
	}

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'sm',
			color,
			label: 'Import Data',
			position: 'nord-est',
			children: presetInfo,
		})

		dialogActor.show()
	}

	/**
	 * Back up current content to filesystem
	 */
	async function deleteCurrentData() {
		if (withBackup) {
			status = 'backing-up'
			// 1. Back up current content to filesystem
			const data = await exportService.buildFullJSON()
			await guardedExport({data})
		}

		status = 'deleting'

		// 2. Delete existing storage: the import replaces OPFS content
		await importService.deleteAllContent()

		status = 'ready'
	}
</script>

{#snippet presetInfo()}
	<form class="raviolink l:stack:lg" enctype="multipart/form-data">
		<Feedback
			status="default"
			context="prose"
			variant="bare"
			size="xs"
			font="sm"
			asset="none"
		>
			<p>Before you import, you must delete current data.</p>
		</Feedback>

		<div class="l:stack:lg">
			<!-- File input triggered by the button -->
			<input
				bind:this={fileInput}
				aria-label="Select file to import"
				type="file"
				accept="application/json,.json"
				class="sr-only"
				onchange={handleFileSelected}
			/>

			<div class="w:full l:flex size:3xs justify:between">
				<div class="l:flex size:3xs justify:between grow">
					<Button
						type="button"
						label="Backup and Delete"
						id="import-dialog-bk-delete"
						name=""
						{color}
						variant="fill"
						shape="mellow"
						size="2xs"
						font="2xs font:heading"
						disabled={disabled || status === 'ready'}
						onclick={deleteCurrentData}
					/>
					<Button
						type="button"
						label="Just Delete"
						id="import-dialog-delete"
						name=""
						color="highlight"
						variant="fill"
						shape="mellow"
						size="2xs"
						font="2xs font:heading"
						disabled={disabled || status === 'ready'}
						onclick={() => {
							withBackup = false
							deleteCurrentData()
						}}
					/>
				</div>
			</div>

			<div class="w:full l:flex size:3xs justify:between">
				<div class="l:flex size:3xs justify:between grow">
					<Button
						type="button"
						label="Import"
						id="import-dialog-reset"
						name=""
						{color}
						variant="outline"
						shape="mellow"
						size="2xs"
						font="2xs font:heading"
						disabled={status !== 'ready'}
						onclick={() => fileInput.click()}
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
	justify="end nowrap"
	align="center"
	shape="mellow"
	variant="outline"
	onclick={showDialog}
>
	<span class="font:heading">{label}</span>
	<ff-con class={`svg:arrow-bar-down size:${size} l:flex`}></ff-con>
</Button>
