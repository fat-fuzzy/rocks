<script lang="ts">
	import {getContext, setContext, type Snippet} from 'svelte'
	import {page} from '$app/state'
	import fatFuzzyUi from '@fat-fuzzy/ui'
	import playbookActor from '$lib/api/actor.svelte'
	import StylesApi from '$lib/api/styles.svelte'

	const {DEFAULT_REVEAL_STATE, DEFAULT_NAV_REVEAL_STATE} = fatFuzzyUi.constants

	type Props = {
		app: {settings: {[key: string]: string}}
		children: Snippet
	}
	let {children}: Props = $props()
	let playbookContext: StylesApi = getContext('playbookContext')
	setContext('playbookActor', playbookActor)

	let {styles, ui} = $state(page.data)

	$effect(() => {
		if (styles) {
			playbookContext.applyStyles(styles)
		}
		if (ui) {
			playbookActor.Reveal = ui?.Reveal || DEFAULT_NAV_REVEAL_STATE
			playbookActor.RevealMenu = ui?.RevealMenu || DEFAULT_REVEAL_STATE
			playbookActor.RevealNav = ui?.RevealNav || DEFAULT_NAV_REVEAL_STATE
			playbookActor.styles = playbookContext.getStyleTree()
		}
	})
</script>

{@render children()}
