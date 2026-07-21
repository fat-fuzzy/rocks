<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'
	import {Editor} from '@tiptap/core'

	let {
		editor,
		commands,
		size = 'xs',
		color = 'primary',
		variant = 'outline',
		preset = 'full',
	}: {
		editor: Editor
		commands: {[key: string]: boolean}
		size?: UiSize
		color?: UiColor
		variant?: UiVariant
		preset?: 'basic' | 'full'
	} = $props()
</script>

<div class="l:flex button-group">
	<button
		onclick={() => editor.chain().focus().toggleBulletList().run()}
		aria-pressed={commands.ul ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} svg:list-ul`}
	>
		<span class="sr-only">Bullet List</span>
	</button>
	<button
		onclick={() => editor.chain().focus().toggleOrderedList().run()}
		aria-pressed={commands.ol ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size} svg:list-ol`}
	>
		<span class="sr-only">Numbered List</span>
	</button>

	<button
		onclick={() => editor.chain().focus().setHorizontalRule().run()}
		class={`toggle color:${color} variant:${variant} size:${size} duo text`}
	>
		HR
		<span class="sr-only">Horizontal Ruler</span>
	</button>

	{#if preset === 'full'}
		<button
			onclick={() => editor.chain().focus().setHardBreak().run()}
			class={`toggle color:${color} variant:${variant} size:${size} duo text`}
		>
			Bk
			<span class="sr-only">Hard Break</span>
		</button>
	{/if}
</div>

<style>
	/* TODO: use svg icons instead */
	.line\:tiny {
		line-height: 0.442;
	}

	.font\:tiny {
		font-size: 0.28rem;
		line-height: 0;
	}
</style>
