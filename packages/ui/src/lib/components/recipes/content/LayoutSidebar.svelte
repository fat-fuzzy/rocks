<script lang="ts">
	import type {LayoutProps} from '$types'
	import {DismissEvent} from '$types'
	import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'

	let {size = 'md', sidenav, app, children}: LayoutProps = $props()

	let brightness = $derived(app?.settings?.brightness)
	let contrast = $derived(app?.settings?.contrast)
	let settingsClass = $derived(
		brightness && contrast ? `settings:${brightness}:${contrast}` : '',
	)
</script>

<div class={`l:sidebar size:${size} align-content:start ${settingsClass}`}>
	{#if sidenav}
		<div class={`l:side reveal-nav ${sidenav.reveal}`}>
			<RevealNav
				{...sidenav}
				position="sticky"
				place="left"
				justify="between"
				size="md"
				dismiss={DismissEvent.click}
			/>
		</div>
	{/if}
	<div class="l:main maki:inline">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
