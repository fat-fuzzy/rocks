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
		onclick={() => editor.chain().focus().undo().run()}
		disabled={!commands.undo}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		Undo
	</button>
	{#key editor.can().chain().focus().redo().run()}
		<button
			onclick={() => editor.chain().focus().redo().run()}
			disabled={!commands.redo}
			class={`toggle color:${color} variant:${variant} size:${size}`}
		>
			Redo
		</button>
	{/key}
</div>
