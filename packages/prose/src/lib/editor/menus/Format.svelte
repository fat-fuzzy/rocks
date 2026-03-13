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
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		<span class="sr-only">Bullet List</span>
		<span aria-hidden={true} class="line:tiny l:stack">
			<span>· —</span>
			<span>· —</span>
			<span>· —</span>
		</span>
	</button>
	<button
		onclick={() => editor.chain().focus().toggleOrderedList().run()}
		aria-pressed={commands.ol ? 'true' : undefined}
		class={`toggle color:${color} variant:${variant} size:${size}`}
	>
		<span class="sr-only">Numbered List</span>
		<span aria-hidden={true} class="line:tiny l:stack justify:between">
			<span><span class="font:tiny">1</span> —</span>
			<span><span class="font:tiny">2</span> —</span>
			<span><span class="font:tiny">3</span> —</span>
		</span>
	</button>

	<button
		onclick={() => editor.chain().focus().setHorizontalRule().run()}
		class={`toggle color:${color} variant:${variant} size:${size} duo`}
	>
		HR
	</button>

	{#if preset === 'full'}
		<button
			onclick={() => editor.chain().focus().setHardBreak().run()}
			class={`toggle color:${color} variant:${variant} size:${size} duo`}
		>
			Bk
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
