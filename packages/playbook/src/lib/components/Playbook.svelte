<script lang="ts">
	import type {Snippet} from 'svelte'
	import {onMount, getContext, setContext} from 'svelte'
	import {page} from '$app/state'
	import playbookActor from '$lib/api/actor.svelte'
	import StylesApi from '$lib/api/styles.svelte'
	import type {ViewingPreferences} from '../../../../ui/dist/types' // TODO: fix this import

	type Props = {
		app: ViewingPreferences
		children: Snippet
	}
	let {children, app}: Props = $props()
	let playbookContext: StylesApi = getContext('playbookContext')
	setContext('playbookActor', playbookActor)
	let {styles, ui} = $derived(page.data)

	$effect(() => {
		// This need to be updated every time the user interacts with a UI component demo (the component itself)
		if (ui) {
			playbookActor.context = ui
		}
		playbookActor.preferences = app
		if (styles) {
			playbookContext.applyStyles(styles)
		}

		$inspect(styles)
		$inspect(playbookActor.styles)
	})
	onMount(() => {
		$inspect(styles)
		// This need to be updated every time the user interacts the Style API controls, which are submitted via a form action
		if (styles) {
			playbookContext.applyStyles(styles)
		}
		playbookActor.styles = playbookContext.getStyleTree()
	})
</script>

{@render children()}
