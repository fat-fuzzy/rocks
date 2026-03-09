<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import {Editor} from '@tiptap/core'
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

<menu
	class={`l:flex size:3xs ravioli:2xs surface:1:${color} align:start justify:center`}
>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
		aria-pressed={commands.h1 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		H1
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
		aria-pressed={commands.h2 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		H2
	</button>

	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
		aria-pressed={commands.h3 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		H3
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
		aria-pressed={commands.h4 ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		H4
	</button>

	<button
		onclick={() => editor.chain().focus().setParagraph().run()}
		aria-pressed={commands.p ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		P
	</button>

	<button
		onclick={() => editor.chain().focus().toggleBold().run()}
		disabled={!editor.can().chain().focus().toggleBold().run()}
		aria-pressed={commands.bold ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		Bold
	</button>

	<button
		onclick={() => editor.chain().focus().toggleItalic().run()}
		disabled={!editor.can().chain().focus().toggleItalic().run()}
		aria-pressed={commands.italic ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		Italic
	</button>
	<button
		onclick={() => editor.chain().focus().setHorizontalRule().run()}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		HR
	</button>

	<div class="l:stack size:2xs">
		<button
			onclick={() => editor.chain().focus().toggleBulletList().run()}
			aria-pressed={commands.ul ? 'true' : undefined}
			class={`toggle color:${color} variant:${variant} size:${size}`}
		>
			Bullet list
		</button>
		<button
			onclick={() => editor.chain().focus().toggleOrderedList().run()}
			aria-pressed={commands.ol ? 'true' : undefined}
			class={`toggle color:${color} variant:${variant} size:${size}`}
		>
			Ordered list
		</button>
	</div>

	<div class="l:stack size:2xs">
		<button
			onclick={setLink}
			aria-pressed={commands.link ? 'true' : undefined}
			class={`toggle color:${color} variant:${variant} size:${size} justify:center`}
		>
			Set link
		</button>
		<button
			onclick={() => editor.chain().focus().unsetLink().run()}
			disabled={!commands.link ? true : undefined}
			class={`toggle color:${color} variant:${variant} size:${size}`}
		>
			Unset link
		</button>
	</div>

	<div class="l:stack size:2xs">
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
</menu>

<style>
	menu {
		max-inline-size: unset;
	}
</style>
