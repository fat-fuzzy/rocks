<script lang="ts">
	import type {Snippet} from 'svelte'
	import {onMount, getContext, setContext} from 'svelte'
	import {page} from '$app/stores'
	import playbookStore from '$lib/api/store.svelte'
	import * as api from '$lib/api/styles.api'

	type Props = {
		nav: any
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookContext: api.StylesApi = getContext('playbookContext')
	setContext('playbookStore', playbookStore)

	let {ui} = $derived($page.data)
	onMount(() => {
		if (ui) {
			playbookContext.applyStyles(ui)
			playbookStore.Reveal = ui.Reveal
			playbookStore.RevealNav = ui.RevealNav
			playbookStore.HeaderRevealNav = ui.HeaderRevealNav
			playbookStore.HeaderRevealSettings = ui.HeaderRevealSettings
		}
		playbookStore.styles = playbookContext.getStyleTree()
	})
</script>

{@render children()}
