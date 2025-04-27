<script lang="ts">
	import type {HeaderProps} from '$types'
	import {DismissEvent} from '$types'

	import constants from '$lib/types/constants.js'
	import RevealContext from '$lib/components/recipes/forms/RevealContext.svelte'
	import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'

	let {
		id = 'ui-header-app',
		breakpoint = 'sm',
		path,
		size = 'md',
		font,
		reveal,
		redirect,
		actionPath,
		formaction = 'updateState',
		main,
		context,
		layout,
	}: HeaderProps = $props()

	const zones: {[key: string]: string} = {
		metro: 'm-zone',
		railway: 'r-zone',
		steam: 's-zone',
		tgv: 'g-zone',
		tram: 't-zone',
		voyager: 'v-zone',
	}

	let zoneId = $derived(zones[layout] ?? 'zone')

	let brightness = $derived(context.brightness)
	let contrast = $derived(context.contrast)
	let preferences = $derived.by(() => {
		let preferences = constants.APP_SETTINGS
		preferences.display[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.display[1].initial =
			contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})
</script>

{#snippet headerContent()}
	<div class="navbar">
		<SkipLinks />
		<HeaderNav
			{id}
			name={id}
			label="Menu"
			title="Menu"
			variant="outline"
			asset="home"
			justify="start"
			dismiss={DismissEvent.outside}
			auto={true}
			links={main}
			{path}
			{size}
			{font}
			{reveal}
			{breakpoint}
			{formaction}
			{actionPath}
			{redirect}
		/>
	</div>

	<RevealContext
		id="appContext"
		name="appContext"
		label="Settings"
		{path}
		{breakpoint}
		{size}
		{font}
		formaction="updateSettings"
		{actionPath}
		{redirect}
		items={preferences}
		onupdate={preferences.onupdate}
		{context}
		reveal={context.reveal}
	>
		<ul class="links:settings end unstyled">
			{#each preferences.links as { title, url, shape, size, asset }}
				<li>
					<a
						class={`shape:${shape} ${asset} size:${size}`}
						href={url}
						target="_blank"
						rel="noreferrer"
						{title}
						aria-label={title}
					>
					</a>
				</li>
			{/each}
		</ul>
	</RevealContext>
{/snippet}

{#if layout}
	<header class={`l:grid ${zoneId}:1 bg:inherit`}>
		{@render headerContent()}
	</header>
{:else}
	<!-- The header tag must provided by the parent component  -->
	{@render headerContent()}
{/if}
