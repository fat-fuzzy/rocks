<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {RevealNavProps} from '$types'
	import {DismissEvent} from '$types'
	import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'

	type Props = {
		size?: string
		nav: RevealNavProps
		app?: {settings: {[key: string]: string}}
		children: Snippet
	}
	let {size = 'md', nav, app, children}: Props = $props()

	let brightness = $derived(app?.settings?.brightness)
	let contrast = $derived(app?.settings?.contrast)
	let settingsClass = $derived(
		brightness && contrast ? `settings:${brightness}:${contrast}` : '',
	)
</script>

<div class={`l:sidebar size:${size} align-content:start ${settingsClass}`}>
	{#if nav}
		<div class={`l:side reveal-nav ${nav.reveal}`}>
			<RevealNav
				{...nav}
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
