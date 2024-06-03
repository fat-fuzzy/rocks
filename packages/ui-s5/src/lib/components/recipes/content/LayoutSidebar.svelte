<script lang="ts">
	import {onDestroy, type Snippet} from 'svelte'
	import type { RevealNavProps } from '$lib/components/recipes/navs/nav.types.js'
	import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'
	import  * as stores from '$lib/stores/ui.js'

	// TODO: fix types
	type Props = {
		path: string,
		nav: RevealNavProps,
		redirect: string,
		children: Snippet
	}
	let {path, nav, redirect, children}: Props = $props()

	let sidebarReveal: {[key: string]: string} = $state({reveal: ''})

	function toggleSidebar(event) {
		sidebarReveal.reveal = event.value
	}

	const localStores = [
		stores.sidebarReveal.subscribe((value) => {
			if (value) {
				sidebarReveal = value
			}
		}),
	]

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<div class="l:sidebar:md">
	<div class={`l:side ${sidebarReveal.reveal}`}>
		<RevealNav
			position="fixed"
			place="left"
			formaction="toggleSidebar"
			actionPath="/"
			{redirect}
			{...nav}
			{path}
			onupdate={toggleSidebar}
		/>
	</div>
	<div class="l:main maki:inline:lg">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
