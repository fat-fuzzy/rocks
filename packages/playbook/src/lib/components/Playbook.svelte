<script lang="ts">
	import type {Snippet} from 'svelte'
	import {onMount, getContext, setContext} from 'svelte'
	import {page} from '$app/state'
	import fatFuzzyUi from '@fat-fuzzy/ui'
	import playbookStore from '$lib/api/store.svelte'
	import * as api from '$lib/api/styles.api'

	type Props = {
		app: {settings: {[key: string]: string}}
		nav: any
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookContext: api.StylesApi = getContext('playbookContext')
	setContext('playbookStore', playbookStore)

	let {styles, ui} = $state(page.data)
	const {DEFAULT_REVEAL_STATE} = fatFuzzyUi.constants

	playbookStore.reveal = DEFAULT_REVEAL_STATE
	playbookStore.navReveal = DEFAULT_REVEAL_STATE
	playbookStore.settingsReveal = DEFAULT_REVEAL_STATE
	playbookStore.sidebarReveal = DEFAULT_REVEAL_STATE

	onMount(() => {
		if (styles) {
			playbookContext.applyStyles(styles)
		}
		if (ui) {
			playbookStore.reveal = ui.Reveal
			playbookStore.navReveal = ui.RevealNav
			playbookStore.settingsReveal = ui.RevealSettings
			playbookStore.sidebarReveal = ui.sidebarReveal
		}
		playbookStore.styles = playbookContext.getStyleTree()
	})
</script>

{@render children()}
