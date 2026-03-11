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
		onclick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
		aria-pressed={commands.h1 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} h1`}
	>
		H1
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
		aria-pressed={commands.h2 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} h2`}
	>
		H2
	</button>

	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
		aria-pressed={commands.h3 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} h3`}
	>
		H3
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
		aria-pressed={commands.h4 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} h4`}
	>
		H4
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
		aria-pressed={commands.h5 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} h5`}
	>
		H5
	</button>
	<button
		onclick={() => editor.chain().focus().setParagraph().run()}
		aria-pressed={commands.p ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} singleton`}
	>
		P
	</button>
</div>
