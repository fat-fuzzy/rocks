<script lang="ts">
	import type {OverlayProps, UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'
	import type {Snippet} from 'svelte'

	import {Editor} from '@tiptap/core'
	import ui from '@fat-fuzzy/ui'

	import FontLevel from '$lib/editor/menus/FontLevel.svelte'
	import FontStyle from '$lib/editor/menus/FontStyle.svelte'
	import Links from '$lib/editor/menus/Links.svelte'
	import Format from '$lib/editor/menus/Format.svelte'
	import Clear from '$lib/editor/menus/Clear.svelte'
	import FlowControl from '$lib/editor/menus/FlowControl.svelte'

	const {Popover} = ui.drafts
	const {SkipLinks} = ui.recipes

	let {
		id,
		skipTo,
		editor,
		commands,
		preset,
		size = 'xs',
		color,
		variant,
		menus,
		onExport,
	}: {
		id: string
		skipTo: string
		editor: Editor
		commands: {[key: string]: boolean}
		preset?: string
		size?: UiSize
		color: UiColor
		variant?: UiVariant
		menus?: {options: OverlayProps; menu: Snippet}[]
		onExport?: () => void
	} = $props()

	const defaultOverlayProps: OverlayProps = $derived({
		id,
		label: 'More',
		asset: 'chevron-down',
		assetType: 'svg',
		color,
		size: '3xs',
		font: 'xs',
		variant: 'outline',
		layer: '1',
		layout: 'switcher',
		position: 'anchored',
		coords: 'bottom-right',
		align: 'center',
		justify: 'end',
	})
</script>

<menu
	class={`editor-menu l:flex:3xs ravioli:3xs surface:1:${color} align:start relative`}
>
	<SkipLinks id={`skip-links-${id}`} text="Skip to content" href={skipTo} />
	<FontLevel {editor} {commands} {size} {color} {variant} />

	<FontStyle {editor} {commands} {size} {color} {variant} />

	<Format {editor} {commands} {size} {color} {variant} preset="full" />

	<Links {editor} {commands} {size} {color} {variant} />

	<FlowControl {editor} {commands} {size} {color} {variant} />

	{#if onExport}
		<div class="button-group">
			<button
				type="button"
				onclick={onExport}
				class={`l:switcher:2xs align:center toggle color:${color} variant:${variant} size:${size} text`}
			>
				Export
			</button>
		</div>
	{/if}

	{#if preset === 'full'}
		<Clear {editor} {commands} {size} {color} {variant} layout="flex" />
	{/if}

	{#if menus}
		{#each menus as { options, menu }, i (i)}
			{@const popoverProps = {
				...defaultOverlayProps,
				...options,
				id: `toggle-options-${options.id}`,
			}}
			<Popover {...popoverProps}>
				<div class="ravioli:3xs l:stack:3xs">
					{@render menu()}
				</div>
			</Popover>
		{/each}
	{/if}
</menu>
