<script lang="ts">
	import {getContext, setContext, type Snippet} from 'svelte'
	import {page} from '$app/state'
	import playbookActor from '$lib/api/actor.svelte'
	import StylesApi from '$lib/api/styles.svelte'

	type Props = {
		app: {settings: {[key: string]: string}}
		children: Snippet
	}
	let {children}: Props = $props()
	let playbookContext: StylesApi = getContext('playbookContext')
	setContext('playbookActor', playbookActor)

	$effect(() => {
		let {styles, ui} = page.data
		if (styles) {
			playbookContext.applyStyles(styles)
		}
		if (ui) {
			playbookActor.context = ui
		}

		playbookActor.styles = playbookContext.getStyleTree()
	})
</script>

{@render children()}
