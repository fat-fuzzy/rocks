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

	const setLink = () => {
		const previousUrl = editor.getAttributes('link').href
		const url = window.prompt('URL', previousUrl)

		// cancelled
		if (url === null) {
			return
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()

			return
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({href: url}).run()
	}
</script>

<div class="l:flex button-group">
	<button
		onclick={setLink}
		aria-pressed={commands.link ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} justify:center `}
	>
		Link
	</button>
	<button
		onclick={() => editor.chain().focus().unsetLink().run()}
		disabled={!commands.isLink ? true : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		Unlink
	</button>
</div>
