<script lang="ts">
	import type {UiColor, UiVariant} from '@fat-fuzzy/ui'

	import {Editor} from '@tiptap/core'
	let {
		editor,
		commands,
		color,
		variant,
	}: {
		editor: Editor
		commands: {[key: string]: boolean}
		color: UiColor
		variant?: UiVariant
	} = $props()
</script>

<menu class={`l:flex size:3xs ravioli:2xs surface:1:${color}`}>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
		aria-pressed={commands.h1 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		H1
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
		aria-pressed={commands.h2 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		H2
	</button>

	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
		aria-pressed={commands.h3 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		H3
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
		aria-pressed={commands.h4 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		H4
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
		aria-pressed={commands.h5 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		H5
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
		aria-pressed={commands.h6 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		H6
	</button>
	<button
		onclick={() => editor.chain().focus().setParagraph().run()}
		aria-pressed={commands.p ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		P
	</button>
	<button
		onclick={() => editor.chain().focus().toggleBold().run()}
		disabled={!editor.can().chain().focus().toggleBold().run()}
		aria-pressed={commands.bold ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		Bold
	</button>
	<button
		onclick={() => editor.chain().focus().toggleItalic().run()}
		disabled={!editor.can().chain().focus().toggleItalic().run()}
		aria-pressed={commands.italic ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		Italic
	</button>
	<button
		onclick={() => editor.chain().focus().toggleStrike().run()}
		disabled={!editor.can().chain().focus().toggleStrike().run()}
		aria-pressed={commands.strike ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		Strike
	</button>
	<button
		onclick={() => editor.chain().focus().toggleBulletList().run()}
		aria-pressed={commands.ul ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		Bullet list
	</button>
	<button
		onclick={() => editor.chain().focus().toggleOrderedList().run()}
		aria-pressed={commands.ol ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		Ordered list
	</button>
	<button
		onclick={() => editor.chain().focus().unsetAllMarks().run()}
		aria-pressed={commands.marks ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		Clear marks
	</button>
	<button
		onclick={() => editor.chain().focus().clearNodes().run()}
		aria-pressed={commands.nodes ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant}`}
	>
		Clear nodes
	</button>
	<button
		onclick={() => editor.chain().focus().setHorizontalRule().run()}
		class={`toggle color:${color} variant:${variant}`}
	>
		Horizontal rule
	</button>
	<button
		onclick={() => editor.chain().focus().setHardBreak().run()}
		class={`toggle color:${color} variant:${variant}`}
	>
		Hard break
	</button>
	<button
		onclick={() => editor.chain().focus().undo().run()}
		disabled={!commands.undo}
		class={`toggle color:${color} variant:${variant}`}
	>
		Undo
	</button>
	{#key editor.can().chain().focus().redo().run()}
		<button
			onclick={() => editor.chain().focus().redo().run()}
			disabled={!commands.redo}
			class={`toggle color:${color} variant:${variant}`}
		>
			Redo
		</button>
	{/key}
</menu>

<style>
	menu {
		max-inline-size: unset;
	}
</style>
