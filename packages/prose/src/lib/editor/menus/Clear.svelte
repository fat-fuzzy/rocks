<script lang="ts">
	import type {UiColor, UiLayout, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import {Editor} from '@tiptap/core'

	let {
		editor,
		commands,
		size = 'xs',
		color = 'primary',
		variant = 'outline',
		layout = 'stack',
	}: {
		editor: Editor
		commands: {[key: string]: boolean}
		size?: UiSize
		color?: UiColor
		variant?: UiVariant
		layout?: UiLayout
	} = $props()
</script>

<div>
	<div class={`l:${layout}:${size} button-group`}>
		<button
			onclick={() => editor.chain().focus().unsetAllMarks().run()}
			aria-pressed={commands.marks ? 'true' : undefined}
			class={`toggle color:${color} variant:${variant} size:${size}`}
		>
			Clear Marks
		</button>
		<button
			onclick={() => editor.chain().focus().clearNodes().run()}
			aria-pressed={commands.nodes ? 'true' : undefined}
			class={`toggle color:${color} variant:${variant} size:${size}`}
		>
			Clear Nodes
		</button>
	</div>
</div>
