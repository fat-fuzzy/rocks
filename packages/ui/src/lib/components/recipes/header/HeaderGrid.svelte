<script lang="ts">
	import type {HeaderProps} from '$types'
	import {DismissEvent} from '$types'
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
		preferences,
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
</script>

<header class={`l:grid ${zoneId}:1 bg:inherit`}>
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
</header>
