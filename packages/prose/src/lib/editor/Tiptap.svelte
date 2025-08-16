<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	import Menu from './Menu.svelte';

	let element: Element;

	// @ts-expect-error editor is not defined at this point but will be on mount
	let editor: Editor = $state();
	let { html }: { html: string } = $props();
	let commands = $state({
		h1: false,
		h2: false,
		p: false
	});
	function setActiveElement() {
		editor.isActive('heading', { level: 1 }) ? (commands.h1 = true) : (commands.h1 = false);
		editor.isActive('heading', { level: 2 }) ? (commands.h2 = true) : (commands.h2 = false);
		editor.isActive('paragraph') ? (commands.p = true) : (commands.p = false);
	}
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: html,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				setActiveElement();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="l:text:lg">
	{#if editor}
		<Menu {editor} {commands} />
	{/if}
	<div class="l:frame:prose maki:block:lg ravioli:md variant:bare dotted scroll:y">
		<div class="content" bind:this={element}></div>
	</div>
</div>

<style nonce="%sveltekit.nonce%">
	.l\:frame\:prose {
		aspect-ratio: 15 / 10;
	}
</style>
