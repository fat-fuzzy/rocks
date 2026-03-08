<script lang="ts">
	import {Editor} from '@tiptap/core'
	let {editor, commands}: {editor: Editor; commands: {[key: string]: boolean}} =
		$props()
</script>

<menu class="l:flex size:2xs ravioli:2xs surface:1:neutral">
	<button
		onclick={() => editor.chain().focus().toggleBold().run()}
		disabled={!editor.can().chain().focus().toggleBold().run()}
		aria-pressed={commands.bold ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		Bold
	</button>
	<button
		onclick={() => editor.chain().focus().toggleItalic().run()}
		disabled={!editor.can().chain().focus().toggleItalic().run()}
		aria-pressed={commands.italic ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		Italic
	</button>
	<button
		onclick={() => editor.chain().focus().toggleStrike().run()}
		disabled={!editor.can().chain().focus().toggleStrike().run()}
		aria-pressed={commands.strike ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		Strike
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
		aria-pressed={commands.h1 ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		H1
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
		aria-pressed={commands.h2 ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		H2
	</button>

	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
		aria-pressed={commands.h3 ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		H3
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
		aria-pressed={commands.h4 ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		H4
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
		aria-pressed={commands.h5 ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		H5
	</button>
	<button
		onclick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
		aria-pressed={commands.h6 ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		H6
	</button>
	<button
		onclick={() => editor.chain().focus().setParagraph().run()}
		aria-pressed={commands.p ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		P
	</button>
	<button
		onclick={() => editor.chain().focus().toggleBulletList().run()}
		aria-pressed={commands.ul ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		Bullet list
	</button>
	<button
		onclick={() => editor.chain().focus().toggleOrderedList().run()}
		aria-pressed={commands.ol ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		Ordered list
	</button>
	<button
		onclick={() => editor.chain().focus().unsetAllMarks().run()}
		aria-pressed={commands.marks ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		Clear marks
	</button>
	<button
		onclick={() => editor.chain().focus().clearNodes().run()}
		aria-pressed={commands.nodes ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		Clear nodes
	</button>
</menu>
