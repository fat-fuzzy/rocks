<script lang="ts">
	import type {Snippet} from 'svelte'

	import {page} from '$app/state'
	import pageActor from './services/actor.svelte'

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()
	let context = $derived(pageActor.getContext())
	$effect(() => {
		let ui = page.data.ui
		if (ui) {
			context.applyStyles(ui)
			context.Reveal = ui.Reveal
			context.RevealNav = ui.RevealNav
			context.HeaderRevealNav = ui.HeaderRevealNav
			context.HeaderRevealSettings = ui.HeaderRevealSettings
		}
	})
</script>

{@render children()}
