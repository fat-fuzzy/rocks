<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {AreaProps, UiLayout, ViewingPreferences} from '@fat-fuzzy/ui'

	import {setContext, onMount, onDestroy} from 'svelte'

	import {buildNav} from '$data/nav'

	import {initBridge, destroyBridge} from '$lib/services/storage/bridge'
	import {createServices} from '$lib/services/container'
	import Dialog from '$lib/ui/overlays/dialog/Dialog.svelte'

	// @ts-expect-error types not used for css
	import '@fat-fuzzy/style/css'
	import '$lib/styles/css/main.css'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'

	const {ToggleTree, ToggleReveal, ToggleSettings} = ui.drafts
	const {SkipLinks} = ui.recipes
	const {LayoutGrid} = ui.content
	const {Magic} = ui.blocks

	let {
		children,
	}: {
		children: Snippet
	} = $props()

	/**
	 * Register Contexts
	 */
	const {seedService, documentService, tagService, exportService} =
		createServices()

	setContext('documentService', documentService)
	setContext('tagService', tagService)
	setContext('exportService', exportService)

	/**
	 * Setup page data (loaded / generated)
	 */
	const sidenav = buildNav('chlorophyll')

	let pathname = $derived(page.url.pathname)
	let layout: UiLayout = $derived.by(() => {
		const _page = page.params.page ? page.params.page : page.url.pathname

		switch (_page) {
			case 'build':
			case 'edit':
			case 'preview':
			case 'print':
				return 'railway'
			case '/cv':
				return 'voyager'
			case '/':
				return 'tgv'
			default:
				return 'voyager'
		}
	})

	let seed = $derived(page.data.seed)
	let base = $derived(page.data.base)
	let structures = $derived(page.data.structures)

	/**
	 * Setup App context (user controlled UI)
	 */
	let appContext: ViewingPreferences = $state({
		brightness: 'system',
		contrast: 'contrast',
		consent: {
			functional: true,
		},
	})

	/**
	 * Setup UI layout
	 */
	const areas: AreaProps[] = $derived([
		{
			zone: zoneHeader,
			grid: true,
			exchange: true,
			tag: 'header',
		},
		{
			zone: zoneContent,
			hug: layout === 'railway',
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	])

	function updateSettings(event: Event) {
		const target = event.target as HTMLInputElement
		// @ts-expect-error expect target name to be brightness or contrast
		appContext[target.name] = target.value
	}

	onMount(async () => {
		initBridge()

		await seedService.init({base, structures}, seed)
		await documentService.init()
		await tagService.init()
	})

	onDestroy(() => destroyBridge())
</script>

<LayoutGrid
	{layout}
	{areas}
	{sidenav}
	size="3xs"
	app={appContext}
	path={pathname}
/>

{#snippet zoneHeader()}
	<div class="sidebar hug align:center raviolink">
		{#if sidenav.layout === 'tgv'}
			<div class="app-name">
				<Magic spell="fuzzy" size="3xs" mask="text" uno="herb">
					<p class="font:h1 font:lg hide:md">Chlorophyll</p>
				</Magic>
			</div>
		{:else}
			<nav
				id="sidenav"
				class="font:md height:lg"
				data-testid={`sidenav-${pathname}`}
			>
				<SkipLinks
					id={`skiplinks-${pathname}`}
					text="Skip to content"
					href="#main"
				/>
				<ToggleReveal
					id="sidenav-reveal"
					label={sidenav.label}
					asset={sidenav.asset}
					assetType={sidenav.assetType}
					color={sidenav.color}
					background={sidenav.background}
					variant="bare"
					checked={pathname.startsWith('/cv/') ? false : undefined}
					area="gare"
					coords="ouest"
					shape="square"
					scroll="y"
					layer="1"
					depth={0}
					font="sm"
					width="sm"
					height="lg"
					dismiss="outside"
				>
					<ToggleTree
						{...sidenav}
						id={`sidenav-${pathname}`}
						{pathname}
						preload={true}
						depth={0}
						shape="square"
						width="md"
					/>
				</ToggleReveal>
			</nav>
		{/if}
	</div>

	<div class="context hug raviolink">
		<ToggleReveal
			id="appContext"
			label="Settings"
			color="neutral"
			asset="settings"
			font="sm"
			layout="flex"
			justify="end"
			coords="est"
			depth={0}
			layer="1"
			variant="bare"
			shape="square"
			background="blur"
		>
			<ToggleSettings
				id="appContext-menu"
				name="app-settings"
				label="Settings"
				selected={appContext}
				oninput={updateSettings}
			/>
		</ToggleReveal>
	</div>
{/snippet}

{#snippet zoneContent()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback outline status:danger emoji:wip">TODO !</p>
	{/if}
	<Dialog />
{/snippet}

{#snippet zoneFooter()}{/snippet}
