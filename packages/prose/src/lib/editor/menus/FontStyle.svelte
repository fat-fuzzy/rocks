<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import {Editor} from '@tiptap/core'

	let {
		editor,
		commands,
		size = 'xs',
		color = 'primary',
		variant = 'outline',
	}: {
		editor: Editor
		commands: {[key: string]: boolean}
		size?: UiSize
		color?: UiColor
		variant?: UiVariant
	} = $props()
</script>

<div class="l:flex button-group">
	<button
		onclick={() => editor.chain().focus().toggleBold().run()}
		disabled={!editor.can().chain().focus().toggleBold().run()}
		aria-pressed={commands.bold ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} svg:type-bold`}
	>
		<span class="sr-only">Bold</span>
	</button>
	<button
		onclick={() => editor.chain().focus().toggleSemiBold().run()}
		disabled={!editor.can().chain().focus().toggleSemiBold().run()}
		aria-pressed={commands.semibold ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} font:semibold h2 text`}
	>
		SB
		<span class="sr-only">Semi-Bold</span>
	</button>
	<button
		onclick={() => editor.chain().focus().toggleItalic().run()}
		disabled={!editor.can().chain().focus().toggleItalic().run()}
		aria-pressed={commands.italic ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} svg:type-italic`}
	>
		<span class="sr-only">Italic</span>
	</button>

	<button
		onclick={() => editor.chain().focus().toggleStrike().run()}
		disabled={!editor.can().chain().focus().toggleStrike().run()}
		aria-pressed={commands.strike ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} svg:type-strikethrough`}
	>
		<span class="sr-only">Strikethrough</span>
	</button>
</div>
