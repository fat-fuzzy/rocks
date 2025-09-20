<script lang="ts">
	import {onMount, type Snippet} from 'svelte'

	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	const {LayoutSidebar} = ui.content

	let appContext = $derived(page.data.appContext)
	let isTalkPage = $derived(page.params.talk)
	let zoneContent: HTMLElement | undefined = $state()

	function toggleFullScreen() {
		if (!isTalkPage || !zoneContent) return

		if (zoneContent.requestFullscreen) {
			zoneContent.requestFullscreen()
		} else {
			// Otherwise exit the full screen
			document.exitFullscreen?.()
		}
	}

	onMount(() => {
		if (!isTalkPage || !zoneContent) return

		// On pressing ENTER call toggleFullScreen method
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				toggleFullScreen()
			}
		})

		return () => {
			document?.removeEventListener('keydown', () => {})
		}
	})
</script>

<LayoutSidebar app={appContext}>
	{#if children}
		<div bind:this={zoneContent} class="zone-content">
			{@render children()}
		</div>
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
