<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {ICoordinateImports} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'

	const {Button, Feedback} = ui.blocks

	interface Props {
		color?: UiColor
		onImported?: () => void // hook for parent to refresh state
	}
	let {color = 'primary', onImported}: Props = $props()

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

	async function handleFileSelected(event: Event) {
		const target = event.target as HTMLInputElement

		const file = target.files?.[0]

		if (!file) return

		try {
			const serialized = await file.text() // read the file — parse happens inside importFromFile

			await coordImports.importFromJSON(serialized)

			// 3. TODO: tell parent to reload from OPFS
			onImported?.()

			window.location.href = '' // FIXME: hacky solution to reload for now
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Import failed'
		} finally {
			// 4. Reset input so the same file can be re-selected if needed
			setTimeout(() => {
				dialogActor.close()
			}, 1500)
		}
	}

	/**
	 * Back up current content to filesystem
	 */
	async function deleteCurrentData() {
		await coordImports.deleteAllContent(withBackup)
	}
</script>

<form class="raviolink l:stack:lg" enctype="multipart/form-data">
	<Feedback context="prose" variant="bare" size="xs" font="sm" asset="none">
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
					label="Just Delete"
					id="import-dialog-delete"
					name=""
					color="highlight"
					variant="outline"
					shape="mellow"
					size="2xs"
					font="2xs font:heading"
					disabled={disabled || status === 'ready'}
					onclick={() => {
						withBackup = false
						deleteCurrentData()
					}}
				/>
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
				status={statusFeedback}
				context="prose"
				variant="bare"
				size="xs"
				font="sm"
				asset={statusFeedback ? status : 'none'}
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
	</div>
</form>
