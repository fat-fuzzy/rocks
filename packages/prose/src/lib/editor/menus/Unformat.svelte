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
		onclick={() => editor.chain().focus().unsetAllMarks().run()}
		aria-pressed={commands.marks ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		Clear marks
	</button>
	<button
		onclick={() => editor.chain().focus().clearNodes().run()}
		aria-pressed={commands.nodes ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		Clear nodes
	</button>
</div>
