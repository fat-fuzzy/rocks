<script lang="ts">
	import type {HeaderProps} from '$types'
	import {DismissEvent} from '$types'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'
	import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'

	let {
		id = 'ui-header-app',
		breakpoint = 'sm',
		path,
		reveal,
		redirect,
		actionPath,
		formaction = 'updateState',
		main,
		sidebar,
		context,
		position,
		placement,
	}: HeaderProps = $props()
	let className = 'header-app'

	let positionClass = position ? `${position}:${placement}` : ''
</script>

<header class={`main-header zone:1 ${positionClass} bg:inherit`}>
	{#if sidebar}
		<SkipLinks />
		<div class="sub-nav gare:ouest">
			{@render sidebar()}
		</div>
	{/if}
	<div class={`main-nav ${className} l:flex  align:center`}>
		{#if !sidebar}
			<SkipLinks />
		{/if}
		<HeaderNav
			{id}
			name={id}
			label="Menu"
			size="xs"
			variant="outline"
			asset="home"
			justify="start"
			dismiss={DismissEvent.outside}
			auto={true}
			links={main}
			{path}
			{reveal}
			{breakpoint}
			{formaction}
			{actionPath}
			{redirect}
		/>
	</div>
	<div class="app-context l:flex size:3xs align:center justify:end">
		<Settings
			id={`${id}-settings`}
			name={`${id}-settings`}
			label=""
			{path}
			{breakpoint}
			size="xs"
			formaction="updateSettings"
			{actionPath}
			{redirect}
			items={context.switch}
			onupdate={context.onupdate}
		/>
		<ul class="links:settings end unstyled">
			{#each context.links as { title, url, shape, size, asset }}
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
	</div>
</header>
