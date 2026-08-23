<script lang="ts">
	import type {UiColor, UiSurface} from '@fat-fuzzy/ui'
	import type {ICoordinateImports} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'

	const {Button, Feedback} = ui.blocks

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

	let withBackup = $state(true)

	/**
	 * Back up current content to filesystem
	 */
	async function deleteCurrentData() {
		await coordImports.deleteAllContent(withBackup)
	}

	async function handleFileSelected(event: Event) {
		const target = event.target as HTMLInputElement

		const file = target.files?.[0]

		if (!file) return

		try {
			const serialized = await file.text() // read the file — parse happens inside importFromFile

			await coordImports.importFromJSON(serialized)
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Import failed'
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
			errorMessage = error instanceof Error ? error.message : 'Reset failed'
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
			errorMessage = error instanceof Error ? error.message : 'Seed failed'
		} finally {
			onsubmit?.()
		}
	}
</script>

<form class="raviolink l:stack:sm" enctype="multipart/form-data">
	<!-- File input triggered by the button -->
	<input
		bind:this={fileInput}
		aria-label="Select file to import"
		type="file"
		accept="application/json,.json"
		class="sr-only"
		onchange={handleFileSelected}
	/>
	<div class="l:sidebar size:lg">
		<div class="l:main l:stack font:sm">
			<h4 class="font:heading">To source data</h4>

			{#if status !== 'ready'}
				<div>
					<p>First, you must delete current data</p>
					<p class="font:semibold">This action cannot be undone</p>
				</div>
			{/if}
			<div>
				<p>When <span class="font:semibold">ready to source</span>, you can:</p>
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
							<span class="font:semibold">Seed Demo</span> to restore demo data
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
			<div class="l:flex size:3xs justify:between grow">
				<Button
					type="button"
					label="Just Delete"
					id="data-delete"
					name=""
					color="highlight"
					variant="outline"
					shape="mellow"
					size="xs"
					font="xs font:heading"
					disabled={disabled || status === 'ready'}
					onclick={() => {
						withBackup = false
						deleteCurrentData()
					}}
				/>
				<Button
					type="button"
					label="Backup and Delete"
					id="data-bk-delete"
					name=""
					{color}
					variant="fill"
					shape="mellow"
					size="xs"
					font="xs font:heading"
					disabled={disabled || status === 'ready'}
					onclick={deleteCurrentData}
				/>
			</div>
			<div class="l:flex size:3xs justify:between grow">
				<Button
					type="button"
					label="Import"
					id="data-reset"
					name=""
					{color}
					variant="outline"
					shape="mellow"
					size="xs"
					font="xs font:heading"
					disabled={status !== 'ready'}
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
					onclick={reSeed}
					disabled={status !== 'ready'}
				/>
			</div>
		</div>
	</div>
</form>
