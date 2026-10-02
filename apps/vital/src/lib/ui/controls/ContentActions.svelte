<script lang="ts">
	import type {UiColor, UiLayout, UiSize} from '@fat-fuzzy/ui'
	import type {
		NamespaceId,
		CurrentCoordinators,
		NamespaceKey,
		LabelsForRoutes,
	} from '$types'

	import {getContext} from 'svelte'
	import {page} from '$app/state'

	import {getSanitizedParamValue, buildForwardedQuery} from '$lib/common/url'
	import MenuData from '$lib/ui/overlays/popover-menu/MenuData.svelte'
	import MenuSections from '$lib/ui/overlays/popover-menu/MenuSections.svelte'
	import MenuSettings from '$lib/ui/overlays/popover-menu/MenuSettings.svelte'

	const coordinators: CurrentCoordinators = getContext('currentCoordinators')

	let coordPresets = $derived(coordinators.presets)
	let coordMetadata = $derived(coordinators.metadata)
	let coordImports = $derived(coordinators.imports)

	let {
		layout = 'switcher',
		color = 'neutral',
		size = '2xs',
		font = 'xs',
		path,
		actions,
		isTwinLayout,
		oninput,
		canEdit,
	}: {
		layout?: UiLayout
		color?: UiColor
		size?: UiSize
		font?: UiSize
		path: NamespaceId
		actions: LabelsForRoutes<NamespaceKey>
		isTwinLayout?: boolean
		oninput: () => void
		canEdit?: {
			presets?: boolean
			doc?: boolean
		}
	} = $props()

	let cta = $derived(page.url.pathname)
	let searchParams = $derived(new URL(page.url.href).searchParams)
	let preset = $derived(getSanitizedParamValue(searchParams, 'preset'))
	let query = $derived(
		buildForwardedQuery(
			searchParams,
			coordMetadata.getTagGroups().map((g) => g.name),
		),
	)
	let linkStyles = $state('font:xs font:semibold font:heading w:full')
</script>

<div class="ui-controls l:stack maki:inline:4xs">
	<nav id="secondary-nav">
		<ul class={`unstyled input-group l:${layout}:3xs w:full justify:between`}>
			{#each Object.entries(actions) as [key, value], i (i)}
				{@const classes =
					`/${path}/${key}` === cta ? linkStyles : `${linkStyles} ink:${color}`}
				{@const presetQuery = preset
					? coordPresets.getPresetQuery(preset)
					: query}
				<li
					aria-current={`/${path}/${key}` === cta}
					class={`cta text:center surface:2:${color} shape:mellow l:flex`}
				>
					<a href={`/${path}/${key}${presetQuery}`} class={linkStyles}>
						<span class={classes}>{value}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="l:flex:2xs w:full justify:between grow">
		<div class="l:flex:2xs justify:between grow">
			{#if canEdit?.doc}
				<MenuSections {oninput} {color} variant="outline" {size} {font} />
			{/if}
		</div>
		<div class="l:flex:2xs justify:between hug">
			{#if !isTwinLayout}
				<MenuSettings {oninput} {color} variant="outline" {size} {font} />
			{/if}
			<MenuData id="button-import" {color} {size} {font} {coordImports} />
		</div>
	</div>
</div>
