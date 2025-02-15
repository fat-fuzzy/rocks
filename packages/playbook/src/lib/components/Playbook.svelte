<script lang="ts">
	import {onMount, getContext, setContext, type Snippet} from 'svelte'
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

	let {styles, context, ui} = $state(page.data)
	const {DEFAULT_REVEAL_STATE, DEFAULT_NAV_REVEAL_STATE} = fatFuzzyUi.constants

	playbookStore.reveal = context
	playbookStore.navReveal = ui?.navReveal || DEFAULT_NAV_REVEAL_STATE
	playbookStore.settingsReveal = ui?.settingsReveal || DEFAULT_REVEAL_STATE
	playbookStore.sidebarReveal = ui?.sidebarReveal || DEFAULT_NAV_REVEAL_STATE

	onMount(() => {
		if (styles) {
			playbookContext.applyStyles(styles)
		}
		playbookStore.styles = playbookContext.getStyleTree()
	})
</script>

{@render children()}
