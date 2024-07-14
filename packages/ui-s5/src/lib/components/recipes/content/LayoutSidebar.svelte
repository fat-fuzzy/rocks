<script lang="ts">
	import {type Snippet} from 'svelte'
	import constants from '$lib/types/constants.js'
	import type { RevealNavProps } from '$lib/components/recipes/navs/nav.types.js'
	import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'

	const {DEFAULT_NAV_REVEAL_STATE} = constants

	// TODO: fix types
	type Props = {
		path: string,
		nav: RevealNavProps,
		redirect: string,
		app?: {settings: {[key: string]: string}}
		children: Snippet
	}
	let {path, nav, redirect, app, children}: Props = $props()

	let sidebarReveal: {[key: string]: string} = $state(nav.reveal ? {reveal: nav.reveal} : DEFAULT_NAV_REVEAL_STATE)
	let brightness = $derived(app?.settings?.brightness)
	let contrast = $derived(app?.settings?.contrast)
	let settingsClass = $derived(brightness && contrast ? ` settings:${brightness}:${contrast}` : ''
)
	function toggleSidebar(event) {
		sidebarReveal.reveal = event.state
	}
</script>

<div class={`l:sidebar:lg align-content:start ${settingsClass}`}>
	<div class={`l:side reveal-nav:md ${sidebarReveal.reveal}`}>
		<RevealNav
			{...nav}
			reveal={sidebarReveal.reveal}
			position="sticky"
			place="left"
			justify="start"
			formaction="toggleSidebar"
			actionPath="/"
			size='sm'
			{redirect}
			{path}
			onclick={toggleSidebar}
		/>
	</div>
	<div class="l:main">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
