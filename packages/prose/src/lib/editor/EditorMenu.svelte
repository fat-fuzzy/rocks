<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'
	import type {Snippet} from 'svelte'

	import {Editor} from '@tiptap/core'
	import ui from '@fat-fuzzy/ui'

	import FontLevel from '$lib/editor/menus/FontLevel.svelte'
	import FontStyle from '$lib/editor/menus/FontStyle.svelte'
	import Links from '$lib/editor/menus/Links.svelte'
	import Format from '$lib/editor/menus/Format.svelte'
	import Clear from '$lib/editor/menus/Clear.svelte'
	import FlowControl from '$lib/editor/menus/FlowControl.svelte'

	const {ToggleReveal} = ui.drafts

	let {
		id,
		editor,
		commands,
		preset,
		size = 'xs',
		color,
		variant,
		menus,
	}: {
		id: string
		editor: Editor
		commands: {[key: string]: boolean}
		preset?: string
		size?: UiSize
		color: UiColor
		variant?: UiVariant
		menus?: Snippet[]
	} = $props()
</script>

<menu
	class={`editor-menu l:flex:3xs ravioli:3xs surface:1:${color} align:start relative`}
>
	<FontLevel {editor} {commands} {size} {color} {variant} />

	<FontStyle {editor} {commands} {size} {color} {variant} />

	<Format {editor} {commands} {size} {color} {variant} preset="full" />

	<Links {editor} {commands} {size} {color} {variant} />

	<FlowControl {editor} {commands} {size} {color} {variant} />

	{#if preset === 'full' || menus}
		<ToggleReveal
			id={`toggle-options-${id}`}
			label="More"
			asset="chevron-down"
			assetType="svg"
			{color}
			size="3xs"
			variant="bare"
			shape="square"
			layer="1"
			layout="flex"
			depth={0}
			place="nord"
			position="absolute"
			align="center"
			justify="end"
		>
			<div class="ravioli:3xs l:stack:3xs">
				{#if preset === 'full'}
					<Clear
						{editor}
						{commands}
						{size}
						{color}
						{variant}
						layout={menus ? 'flex' : undefined}
					/>
				{/if}
				{#if menus}
					{#each menus as children, i (i)}
						{@render children()}
					{/each}
				{/if}
			</div>
		</ToggleReveal>
	{/if}
</menu>
