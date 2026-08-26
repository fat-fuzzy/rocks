<script lang="ts">
	import type {Preset, ICoordinatePresets, Slug} from '$types'

	import {getContext} from 'svelte'
	import {page} from '$app/state'
	import {resolve} from '$app/paths'
	import ui from '@fat-fuzzy/ui'

	import DialogSavePreset from '$lib/ui/controls/preset/DialogSavePreset.svelte'
	import DialogDeletePreset from '$lib/ui/controls/preset/DialogDeletePreset.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	const {Feedback, Button} = ui.blocks

	const {
		id,
		title = 'Presets',
		headingLevel = 3,
		currentPreset,
		oninput,
	}: {
		id: Slug
		title?: string
		headingLevel?: number
		currentPreset: string | null
		oninput: (e: Event) => void
	} = $props()

	let cta = $derived(page.params.page)
	let query = $derived(page.url.search)

	let coordPresets: ICoordinatePresets = getContext('coordPresets')

	let presetIndex: Record<string, Preset> = $derived(coordPresets.loadPresets())
	let presets = $derived(Object.values(presetIndex))

	let loading = $derived(coordPresets.loading)
	let error = $derived(coordPresets.error)

	function savePreset(preset: Preset) {
		coordPresets.savePreset({
			path: {
				filename: preset.name,
				filetype: 'json',
			},
			meta: {
				id: preset.id,
				name: preset.name,
				label: preset.name,
				content_type: 'preset',
			},
			preset: {
				...preset,
				query,
			},
		})
	}

	function toggleLock(preset: Preset) {
		coordPresets.togglePresetLock({
			path: {
				filename: preset.name,
				filetype: 'json',
			},
			meta: {
				id: preset.id,
				name: preset.name,
				label: preset.name,
				content_type: 'preset',
			},
			preset,
		})
	}
</script>

<div class="presets justify:start shape:soft l:stack:3xs raviolink">
	<div class="w:full l:flex:2xs align:center justify:between">
		<svelte:element this={`h${headingLevel}`} class="ravioli:3xs">
			{title}
		</svelte:element>
		{#if cta === 'edit' || cta === 'build'}
			<DialogSavePreset
				id={`dialog-add-preset-${id}`}
				color="primary"
				label="New Preset"
				asset="plus"
				assetType="svg"
				cta="save"
				preset={{
					id: crypto.randomUUID(),
					name: '',
					query,
				}}
			/>
		{/if}
	</div>
	{#if loading}
		<Loading color="neutral" />
	{:else if error}
		<Feedback status="error" context="prose" variant="bare" asset="none">
			<p>Failed to load presets.</p>
		</Feedback>
	{:else}
		<div
			class={`scroll:container contain:${presets.length > 4 ? 'xs' : '2xs'} shape:mellow surface:${presets.length === 0 ? '1:neutral' : '0:neutral variant:bare '}`}
		>
			{#if presets.length === 0}
				<div
					class="feedback:prose w:full justify:center ravioli:2xl variant:bare scroll:y"
				>
					<div class="l:stack font:sm raviolink">
						{#if (cta === 'build' || cta === 'edit') && query.includes('section')}
							<p class="font:heading font:semibold text:center">
								You don't have presets yet
							</p>
							<ff-icon class="emoji:default font:xl"></ff-icon>
						{:else}
							<p class="font:heading font:semibold">To add a preset</p>
							<ol class="maki:inline:lg">
								<li>
									<a href={resolve('/cv/edit')} class="font:sm">Edit</a> some content
								</li>
								<li>
									<a href={resolve('/cv/build')} class="font:sm">Build</a> the structure
								</li>
								<li>Save it as a preset!</li>
							</ol>
						{/if}
					</div>
				</div>
			{:else}
				<ol class="unstyled scroll:y">
					{#each presets as preset, i (i)}
						{@const isCurrent = currentPreset === preset.name}

						<li
							aria-current={isCurrent}
							class={`raviolink shape:mellow l:flex justify:between ${isCurrent ? 'surface:0:primary' : ''}`}
						>
							<a
								href={resolve(`/cv/${cta}/${preset.query}`)}
								class="font:sm raviolink grow"
							>
								{preset.name}
							</a>
							{#if cta === 'edit' || cta === 'build' || cta !== 'print'}
								<div class="l:flex:4xs align:center justify:end hug">
									{#if cta === 'edit' || cta === 'build'}
										{#if isCurrent && !preset.locked}
											<input
												type="radio"
												title="Editing"
												id={preset.name}
												checked={true}
												name={id}
												value={preset.name}
												disabled={!preset.query}
												class="maki:block"
												{oninput}
											/>
										{/if}
										<Button
											label="Save Preset"
											type="button"
											id="preset-dialog-submit"
											name=""
											asset={!isCurrent ||
											preset.locked ||
											(isCurrent && query === preset.query)
												? 'check'
												: 'save'}
											assetType="svg"
											shape="round"
											color="primary"
											variant="bare"
											size="2xs"
											font="2xs font:heading"
											disabled={preset.locked || !isCurrent}
											onclick={() => savePreset(preset)}
										/>
										<DialogSavePreset
											label="Duplicate Preset"
											id={`duplicate-preset-${preset.id}`}
											size="2xs"
											shape="round"
											variant="bare"
											asset="copy"
											assetType="svg"
											cta="copy"
											disabled={!isCurrent}
											preset={{
												id: crypto.randomUUID(),
												name: preset.name,
												query,
											}}
										/>
									{/if}
									<DialogDeletePreset
										id={`delete-preset-${preset.id}`}
										{preset}
										size="2xs"
										disabled={preset.locked || !preset.query}
									/>
									{#if cta === 'edit' || cta === 'build'}
										<Button
											label={preset.locked ? 'Unlock Preset' : 'Lock Preset'}
											type="button"
											id="preset-dialog-submit"
											name=""
											asset={preset.locked ? 'lock' : 'unlock'}
											assetType="svg"
											shape="round"
											color="primary"
											variant={preset.locked ? 'fill' : 'bare'}
											size="2xs"
											font="2xs font:heading"
											disabled={!preset.query}
											onclick={() => toggleLock(preset)}
										/>
									{/if}
								</div>
							{/if}
						</li>
					{/each}
				</ol>
			{/if}
		</div>
	{/if}
</div>
