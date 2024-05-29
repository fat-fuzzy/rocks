<script lang="ts">
	import {onDestroy, type Snippet} from 'svelte'
	import {page} from '$app/stores'
	import {
		recipes,
		stores,
	} from '@fat-fuzzy/ui-s5'

	const {RevealNav} = recipes

	// TODO: fix types
	type Props = {
		nav: { title: string, id: string, items: any[], reveal:string, settings: any, color:string, size:string, breakpoint: string, background: string},
		path: string,
		children: Snippet}
	let {path, nav, children}: Props = $props()

	let sidebarReveal: {[key: string]: string} = $state({reveal: ''})

	function toggleSidebar(event) {
		sidebarReveal.reveal = event.value
	}

	const localStores = [
		stores.settings.sidebarReveal.subscribe((value) => {
			if (value) {
				sidebarReveal = value
			}
		}),
	]

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<div class="l:sidebar:md align-content:start">
	<div class={`l:side ${sidebarReveal.reveal}`}>
		<RevealNav
			{path}
			position="fixed"
			place="left"
			formaction="toggleSidebar"
			actionPath="/"
			redirect={$page.url.pathname}
			onupdate={toggleSidebar}
			{...nav}
		/>
	</div>
	<div class="l:main l:stack:xl maki:inline">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
