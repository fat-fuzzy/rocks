<script lang="ts">
	import type {Snippet} from 'svelte'
	import {onMount, setContext} from 'svelte'
	import {page} from '$app/state'
	import playbook from '@fat-fuzzy/playbook'
	import PlaybookSettings from '$lib/forms/actions/page-actor.svelte'

	const {StylesApi, Playbook} = playbook

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookSettings = new PlaybookSettings()
	let {styles, ui, settings} = $derived(page.data)
	let context = new StylesApi()
	setContext('playbookContext', context)
	setContext('playbookSettings', playbookSettings)
	onMount(() => {
		if (ui) {
			context.applyStyles(styles)
			// context.Reveal = ui.Reveal
			// context.RevealNav = ui.RevealNav
			// context.HeaderRevealNav = ui.HeaderRevealNav
			// context.HeaderRevealSettings = ui.HeaderRevealSettings
		}
		if (settings.brightness) {
			playbookSettings.updateBrightness(settings.brightness)
		}
		if (settings.brightness) {
			playbookSettings.updateContrast(settings.brightness)
		}
	})
</script>

<Playbook app={playbookSettings.app}>
	{@render children()}
</Playbook>
