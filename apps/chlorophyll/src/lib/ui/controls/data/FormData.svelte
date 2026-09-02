<script lang="ts">
	import type {InputProps, UiColor, UiSurface} from '@fat-fuzzy/ui'
	import type {ICoordinateImports} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'

	import Export from '$lib/ui/controls/data/Export.svelte'

	const {Button, InputGroup, Feedback} = ui.blocks

	import {DEFAULT_STRUCTURES, DEFAULT_CONTENT} from '$data/doc/cv-config'

	interface Props {
		color?: UiColor
		onsubmit?: () => void // hook for parent to refresh state
	}
	let {color = 'primary', onsubmit}: Props = $props()

	let coordImports: ICoordinateImports = getContext('coordImports')

	let errorMessage = $state('')
	let fileInput: HTMLInputElement
	let status = $derived(coordImports.status)
	let statusLabel = $derived(coordImports.statusLabel)
	let statusFeedback = $derived(coordImports.statusFeedback)
	let disabled = $derived(
		coordImports.status === 'backing-up' ||
			coordImports.status === 'deleting' ||
			coordImports.status === 'importing',
	)

	const deleteOptions: Partial<InputProps>[] = $derived([
		{
			id: 'with-backup',
			name: 'with-backup',
			value: 'with-backup',
			checked: false,
			label: 'Backup and Delete',
			color: 'primary',
			title: 'Backup and Delete',
			disabled: disabled || status === 'ready',
		},
		{
			id: 'just-delete',
			name: 'just-delete',
			value: 'just-delete',
			checked: false,
			label: 'Just Delete',
			color: 'highlight',
			title: 'Just Delete',
			disabled: disabled || status === 'ready',
		},
	])
	/**
	 * Back up current content to filesystem
	 */
	function setDeleteStrategy(event: Event) {
		const target = event.target as HTMLInputElement

		coordImports.setDeleteStrategy(target.value === 'with-backup')
	}

	async function deleteCurrentData() {
		await coordImports.deleteAllContent()
	}

	async function handleFileSelected(event: Event) {
		const target = event.target as HTMLInputElement

		const file = target.files?.[0]

		if (!file) return

		try {
			const serialized = await file.text() // read the file — parse happens inside importFromFile

			await coordImports.restoreFromBackup(serialized)
		} catch (error) {
			errorMessage =
				error instanceof Error && error.message
					? error.message
					: 'Import failed'
		} finally {
			// 3. TODO: tell parent to reload from OPFS
			onsubmit?.()
		}
	}

	/**
	 * Restore OPFS content from seed markdowns
	 */
	async function freshStart() {
		try {
			await coordImports.initSeed(DEFAULT_STRUCTURES, DEFAULT_CONTENT)
		} catch (error) {
			errorMessage =
				error instanceof Error && error.message ? error.message : 'Reset failed'
		} finally {
			// 3. TODO: tell parent to reload from OPFS
			onsubmit?.()
		}
	}

	/**
	 * Restore OPFS content from seed markdowns
	 */
	async function reSeed() {
		try {
			// TODO: make it possible to seed without network ?
			await coordImports.initSeed(
				{base: page.data.base, structures: page.data.structures},
				page.data.seed.content,
			)
		} catch (error) {
			errorMessage =
				error instanceof Error && error.message ? error.message : 'Seed failed'
		} finally {
			onsubmit?.()
		}
	}
</script>

<form class="raviolink l:stack:sm" enctype="multipart/form-data">
	<p class="font:sm">Your data lives in your browser.</p>
	<!-- File input triggered by the button -->
	<input
		bind:this={fileInput}
		aria-label="Select file to import"
		type="file"
		accept="application/json,.json"
		class="sr-only"
		onchange={handleFileSelected}
	/>
	<h4 class="font:heading">To source data</h4>
	<div class="l:sidebar size:lg">
		<div class="l:main l:stack font:sm">
			{#if status !== 'ready'}
				<div>
					<p>First, you must delete current data</p>
				</div>
			{/if}
			<div>
				<p>
					When you are <span class="font:semibold">ready to source</span>, you
					can:
				</p>
				<div class="size:xs font:sm maki:block">
					<ul>
						<li>
							<span class="font:semibold">Import</span> to restore data from a previous
							backup
						</li>
						<li>
							<span class="font:semibold">Fresh Start</span> to start from a clean
							slate
						</li>
						<li>
							<span class="font:semibold">Seed Demo</span> to restore the app demo
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="l:side l:stack font:sm l:flex:column justify:between">
			{#if status}
				<Feedback
					status={statusFeedback}
					context="prose"
					variant="bare"
					size="xs"
					font="sm"
					surface={statusFeedback ? (statusFeedback as UiSurface) : 'neutral'}
					asset={statusFeedback && status !== 'idle' ? status : 'none'}
				>
					<output class="w:full text:center">
						{#if status === 'error'}
							{errorMessage}
						{:else}
							{statusLabel}
						{/if}
					</output>
				</Feedback>
			{/if}
			<div class="l:flex size:3xs justify:between align:start grow">
				<InputGroup
					id="delete-strategy"
					name="delete-strategy"
					legend="Delete strategy"
					type="radio"
					value={coordImports.withBackup ? ['with-backup'] : ['just-delete']}
					size="2xs"
					color="highlight"
					variant="bare"
					selectAll={true}
					items={deleteOptions}
					oninput={setDeleteStrategy}
				/>
				<div class="l:stack maki:block:sm">
					<Button
						type="button"
						label="Delete"
						id="data-delete"
						name=""
						color="primary"
						variant="outline"
						shape="mellow"
						size="xs"
						font="xs font:heading"
						disabled={disabled || status === 'ready'}
						hint="This action cannot be undone"
						onclick={deleteCurrentData}
					/>
				</div>
			</div>
			<div class="l:flex size:3xs justify:between grow">
				<Button
					type="button"
					id="data-reset"
					name=""
					label="Import"
					{color}
					variant="outline"
					shape="mellow"
					size="xs"
					font="xs font:heading"
					disabled={status !== 'ready'}
					asset="arrow-bar-down"
					assetType="svg"
					onclick={() => fileInput.click()}
				/>

				<Button
					type="button"
					label="Fresh Start"
					id="data-fresh-start"
					name=""
					{color}
					variant="outline"
					shape="mellow"
					size="xs"
					font="xs font:heading"
					asset="leaf"
					assetType="svg"
					onclick={freshStart}
					disabled={status !== 'ready'}
				/>
				<Button
					type="button"
					label="Seed Demo"
					id="data-seed"
					name=""
					{color}
					shape="mellow"
					variant="outline"
					size="xs"
					font="xs font:heading"
					asset="herb openmoji:xs"
					assetType="svg"
					onclick={reSeed}
					disabled={status !== 'ready'}
				/>
			</div>
		</div>
	</div>
	<hr />
	<div class="l:sidebar size:lg">
		<div class="l:main">
			<h4 class="font:heading">To backup data</h4>
		</div>
		<div class="l:side">
			<Export {color} id="export-data" filename="doc" />
		</div>
	</div>
</form>
