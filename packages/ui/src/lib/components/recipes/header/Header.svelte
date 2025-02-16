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
		items,
	}: HeaderProps = $props()
	let className = 'header-app'
</script>

<header class="sticky:top">
	<SkipLinks />
	<div class={`l:sidebar ${className} align:center`}>
		<div class="l:main l:flex align:center">
			<HeaderNav
				{id}
				name={id}
				label=""
				title="Menu"
				size="xs"
				variant="outline"
				asset="home"
				justify="start"
				dismiss={DismissEvent.outside}
				auto={true}
				links={items.links}
				{path}
				{reveal}
				{breakpoint}
				formaction="toggleNav"
				{actionPath}
				{redirect}
			/>
		</div>
		<div class="l:side l:flex align:center">
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
				items={items.settings.switch}
				onupdate={items.settings.onupdate}
			/>
			<ul class="links:settings end unstyled">
				{#each items.settings.links as { title, url, shape, size, asset }}
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
	</div>
</header>
