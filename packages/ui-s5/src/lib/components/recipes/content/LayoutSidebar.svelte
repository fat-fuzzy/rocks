<script lang="ts">
	import {type Snippet} from 'svelte'
	import type { RevealNavProps } from '$lib/components/recipes/navs/nav.types.js'
	import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'

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
</script>

<div class="l:sidebar:md">
	<div class={`l:side reveal-nav:md ${sidebarReveal.reveal}`}>
		<RevealNav
			{...nav}
			position="sticky"
			place="left"
			formaction="toggleSidebar"
			actionPath="/"
			size='sm'
			{redirect}
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
