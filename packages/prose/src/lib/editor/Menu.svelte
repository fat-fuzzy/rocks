<script lang="ts">
	import {Editor} from '@tiptap/core'
	let {editor, commands}: {editor: Editor; commands: {[key: string]: boolean}} =
		$props()
</script>

<menu class="l:flex size:2xs ravioli:2xs surface:1:neutral">
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
		onclick={() => editor.chain().focus().setParagraph().run()}
		aria-pressed={commands.p ? 'true' : undefined}
		class="toggle color:primary variant:bare"
	>
		P
	</button>
</menu>
