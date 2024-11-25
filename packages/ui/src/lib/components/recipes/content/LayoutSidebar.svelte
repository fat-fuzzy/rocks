<script lang="ts">
	import {type Snippet} from 'svelte'
	import constants from '$lib/types/constants.js'
	import type {RevealNavProps} from '$types'
	import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'

	const {DEFAULT_NAV_REVEAL_STATE} = constants

	// TODO: fix types
	type Props = {
		nav: RevealNavProps
		app?: {settings: {[key: string]: string}}
		children: Snippet
	}
	let {nav, app, children}: Props = $props()

	let sidebarReveal: {[key: string]: string} = $state(
		nav.reveal ? {reveal: nav.reveal} : DEFAULT_NAV_REVEAL_STATE,
	)
	let brightness = $derived(app?.settings?.brightness)
	let contrast = $derived(app?.settings?.contrast)
	let settingsClass = $derived(
		brightness && contrast ? `settings:${brightness}:${contrast}` : '',
	)
	function toggleSidebar(event) {
		sidebarReveal.reveal = event.state
	}
</script>

<div class={`l:sidebar:lg align-content:start ${settingsClass}`}>
	<div class={`l:side reveal-nav ${sidebarReveal.reveal}`}>
		<RevealNav
			{...nav}
			reveal={sidebarReveal.reveal}
			position="sticky"
			place="left"
			justify="between"
			formaction="toggleSidebar"
			size="md"
			dismiss="click"
			onclick={toggleSidebar}
		/>
	</div>
	<div class="l:main maki:inline">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
