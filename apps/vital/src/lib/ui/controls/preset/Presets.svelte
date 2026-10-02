<script lang="ts">
	import type {
		Preset,
		Slug,
		RouteId,
		NamespaceId,
		ICoordinateCompare,
	} from '$types'

	import {getContext} from 'svelte'
	import {resolve} from '$app/paths'
	import ui, {type UiColor} from '@fat-fuzzy/ui'

	import DialogSavePreset from '$lib/ui/overlays/dialog/DialogSavePreset.svelte'
	import DialogDeletePreset from '$lib/ui/overlays/dialog/DialogDeletePreset.svelte'
	import Loading from '$lib/ui/Loading.svelte'
	import {getNamespaces} from '$lib/common/routing'
	import {goto} from '$app/navigation'

	const {Feedback, Button} = ui.blocks

	const {
		id,
		route,
		query,
		title = 'Presets',
		color = 'neutral',
		headingLevel = 3,
		role = 'default',
		root,
		currentPreset,
		oninput,
		canEdit,
	}: {
		id: Slug
		route: RouteId
		query: string
		title?: string
		color?: UiColor
		role?: 'source' | 'target' | 'default'
		root: NamespaceId
		headingLevel?: number
		currentPreset?: string | null
		oninput: () => void
		canEdit?: {
			presets?: boolean
			doc?: boolean
		}
	} = $props()

	const coordCompare: ICoordinateCompare = getContext('coordCompare')
	const coordPresets = $derived(coordCompare.getCoordPresets(root))

	let presetIndex: Record<string, Preset> = $derived(coordPresets.loadPresets())
	let presets = $derived(Object.values(presetIndex))

	let loading = $derived(coordPresets.loading)
	let error = $derived(coordPresets.error)

	let namespaceList = getNamespaces()

	function updateSourceRoot(event: Event) {
		const target = event.target as HTMLInputElement
		const value = target.value as NamespaceId

		goto(
			`${route}/${coordCompare.getCompareQuery({
				params: new URLSearchParams(query),
				role: 'source',
				namespace: value,
			})}`,
		)
	}

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

<div class="presets justify:start shape:mellow l:stack:3xs raviolink">
	<div class="ui-controls w:full l:flex:2xs align:center justify:between">
		<svelte:element this={`h${headingLevel}`} class="maki:block:3xs">
			{title}
		</svelte:element>

		{#if role === 'source'}
			<label class="w:full size:2xs l:flex:2xs font:sm space:between">
				<span> Source Root </span>
				<select
					class="size:2xs font:sm grow variant:bare color:neutral"
					name="source_root"
					id="source_root"
					onselect={updateSourceRoot}
					onchange={updateSourceRoot}
					onblur={updateSourceRoot}
					value={root}
				>
					{#each namespaceList as { name, title }, i (i)}
						<option class="size:xs font:xs" value={name}>
							{title}
						</option>
					{/each}
				</select>
			</label>
		{/if}

		{#if role === 'target'}
			<input type="hidden" name="target_root" value={root} />
		{/if}

		{#if canEdit?.presets}
			<div>
				<DialogSavePreset
					id={`dialog-add-preset-${id}`}
					{color}
					label="New Preset"
					asset="plus"
					assetType="svg"
					cta="save"
					preset={{
						id: crypto.randomUUID(),
						name: '',
						query,
					}}
					{coordPresets}
				/>
			</div>
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
						{#if canEdit?.presets && query.includes('section')}
							<p class="font:heading font:semibold text:center">
								You don't have presets yet
							</p>
							<ff-icon class="emoji:default font:xl"></ff-icon>
						{:else}
							<p class="font:heading font:semibold">To add a preset</p>
							<ol class="maki:inline:lg">
								<li>
									<a href={resolve(route)} class="font:sm">Edit</a> some content
								</li>
								<li>
									<a href={resolve(route)} class="font:sm">Build</a> the structure
								</li>
								<li>Save it as a preset!</li>
							</ol>
						{/if}
					</div>
				</div>
			{:else}
				<ul class="unstyled scroll:y">
					{#each presets as preset, i (i)}
						{@const isCurrent = currentPreset === preset.name}
						{@const presetQuery =
							role === 'default'
								? coordPresets.getPresetQuery(preset.name)
								: coordCompare.getCompareQuery({
										params: new URLSearchParams(query),
										role,
										namespace: root,
										presetName: preset.name,
									})}

						<li
							aria-current={isCurrent}
							class={`raviolink l:flex justify:between ${isCurrent ? `surface:0:${color} chroma:1` : ''}`}
						>
							<a
								href={`${route}/${presetQuery}`}
								class="font:sm raviolink grow"
							>
								{preset.name}
							</a>
							{#if canEdit?.presets}
								<div class="l:flex:4xs align:center justify:end hug">
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
										{color}
										variant="bare"
										size="2xs"
										font="2xs"
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
										{color}
										disabled={!isCurrent}
										preset={{
											id: crypto.randomUUID(),
											name: preset.name,
											query,
										}}
										{coordPresets}
									/>
									<DialogDeletePreset
										id={`delete-preset-${preset.id}`}
										{preset}
										size="2xs"
										disabled={preset.locked || !preset.query}
										{coordPresets}
									/>
									<Button
										label={preset.locked ? 'Unlock Preset' : 'Lock Preset'}
										type="button"
										id="preset-dialog-submit"
										name=""
										asset={preset.locked ? 'lock' : 'unlock'}
										assetType="svg"
										shape="round"
										{color}
										variant={preset.locked ? 'fill' : 'bare'}
										size="2xs"
										font="2xs"
										disabled={!preset.query}
										onclick={() => toggleLock(preset)}
									/>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
