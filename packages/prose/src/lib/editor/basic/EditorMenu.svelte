<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import {Editor} from '@tiptap/core'
	import FontLevel from '$lib/editor/menus/FontLevel.svelte'
	import FontStyle from '$lib/editor/menus/FontStyle.svelte'
	import Links from '$lib/editor/menus/Links.svelte'
	import Format from '$lib/editor/menus/Format.svelte'
	import FlowControl from '$lib/editor/menus/FlowControl.svelte'

	let {
		editor,
		commands,
		size = 'xs',
		color,
		variant,
	}: {
		editor: Editor
		commands: {[key: string]: boolean}
		size?: UiSize
		color: UiColor
		variant?: UiVariant
	} = $props()
</script>

<menu
	class={`editor-menu l:flex size:3xs ravioli:2xs surface:1:${color} justify:between`}
>
	<FontLevel {editor} {commands} {size} {color} {variant} />

	<FontStyle {editor} {commands} {size} {color} {variant} />

	<Format {editor} {commands} {size} {color} {variant} />

	<Links {editor} {commands} {size} {color} {variant} />

	<FlowControl {editor} {commands} {size} {color} {variant} />
</menu>
