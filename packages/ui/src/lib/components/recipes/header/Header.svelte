<script lang="ts">
	import type {HeaderProps} from '$types'
	import constants from '$lib/types/constants.js'
	import SettingsMenu from '$lib/components/recipes/menus/SettingsMenu.svelte'
	import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'ui-header-app',
		breakpoint = 'sm',
		path,
		items,
	}: HeaderProps = $props()
	let className = 'header-app'

	let navReveal = $state(DEFAULT_REVEAL_STATE)
	let reveal = $derived(navReveal.reveal)
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
				dismiss="outside"
				auto={true}
				links={items.links}
				{path}
				{reveal}
				{breakpoint}
				actionPath={path}
				formaction="toggleNav"
			/>
		</div>
		<div class="l:side l:flex align:center">
			<SettingsMenu
				id={`${id}-menu-settings`}
				name={`${id}-menu-settings`}
				label=""
				{path}
				{breakpoint}
				size="xs"
				formaction="updateSettings"
				items={items.settings.switch}
				onupdate={items?.settings.onupdate}
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
