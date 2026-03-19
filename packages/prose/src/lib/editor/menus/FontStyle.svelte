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
		class={`toggle color:${color} variant:${variant} size:${size} font:bold h2`}
	>
		B
	</button>
	<button
		onclick={() => editor.chain().focus().toggleSemiBold().run()}
		disabled={!editor.can().chain().focus().toggleSemiBold().run()}
		aria-pressed={commands.semibold ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} font:semibold h2`}
	>
		SB
	</button>
	<button
		onclick={() => editor.chain().focus().toggleItalic().run()}
		disabled={!editor.can().chain().focus().toggleItalic().run()}
		aria-pressed={commands.italic ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} font:italic h2`}
	>
		I
	</button>

	<button
		onclick={() => editor.chain().focus().toggleStrike().run()}
		disabled={!editor.can().chain().focus().toggleStrike().run()}
		aria-pressed={commands.strike ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} font:strike h2`}
	>
		S
	</button>
</div>

<style>
	.h1,
	.h2,
	.h3,
	.h4,
	.h5 {
		font-size: var(--font-size-h5);
	}
</style>
