<script lang="ts">
	import {getStores} from '$app/stores'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import {lang} from '$stores/intl'
	import format from '$lib/utils/format'
	import {theme as apiTheme} from '$lib/stores/theme.js'
	import {themes} from '$types/constants.js'

	import ActionLabel from '$lib/components/blocks/global/ActionLabel.svelte'

	export let className = 'header-app'
	export let breakpoint = 'xxl'
	export let background = ''
	export let id = 'ui'
	export let theme: any // theme store

	let page = getStores().page
	export let items = {
		main: [{slug: 'about', title: 'About'}],
		side: [
			{
				id: 'button-theme',
				title: 'Theme',
				action: 'theme',
				asset: 'emoji', // Fix asset per theme
				variant: 'round',
				size: 'xl',
			},
			{
				id: 'link-github',
				title: 'GitHub icon',
				url: 'https://github.com/fat-fuzzy/rocks',
				asset: 'svg', // Fix asset per theme
				variant: 'round',
				size: 'md',
			},
			// {
			// 	id: 'menu-lang',
			// 	title: 'Lang',
			// 	asset: langMenuIcon,
			// 	type: 'emoji',
			// 	// TODO: figure out a better way to [name / deal with] submenu items - see LinkList component
			// 	subitems: languages.map((l) => ({
			// 		id: l.code,
			// 		title: l.title,
			// 		action: setLanguage,
			// 		asset: langEmojis[l.code],
			// 		type: 'emoji',
			// 	})),
			// },
		],
	}

	let navExpanded = false
	let settingsExpanded = false

	function handleClickOutsideMainNav(event) {
		navExpanded = false
	}

	function handleClickOutsideSettings(event) {
		settingsExpanded = false
	}

	function toggleSettings(event) {
		settingsExpanded = !settingsExpanded
	}

	function toggleNav(event) {
		navExpanded = !navExpanded
	}

	function toggleTheme(event) {
		const _theme = $currentTheme ? 0 : 1
		currentTheme.set(_theme)
	}

	function setLanguage(event) {
		lang.set(event.detail)
	}

	const actions: {[key: string]: (event) => void} = {
		nav: toggleNav,
		actions: toggleSettings,
		theme: toggleTheme,
		language: setLanguage,
	}
	$: currentTheme = theme ? theme : apiTheme
	$: brightness = themes[$currentTheme]
	$: headerClass = `${className} l:sidebar:md layer sticky:top bg:${background} ${brightness}`
	$: show = background ? `bg:${background} show` : 'show'
	$: showNav = navExpanded ? show : 'hide:viz-only'
	$: showSettings = settingsExpanded ? show : 'hide:viz-only'
</script>

<header class={headerClass}>
	<div
		class={`l:main:50 l:reveal:auto bp:${breakpoint}`}
		use:clickOutside
		on:clickOutside={handleClickOutsideMainNav}
	>
		<button
			id={`${id}-primary-nav-button`}
			class={`font:sm outline`}
			aria-expanded={navExpanded}
			aria-controls={`${id}-primary-nav`}
			on:click={toggleNav}
		>
			{format.formatLabel('Menu', '🐣')}
		</button>

		<nav id={`${id}-primary-nav`} class={showNav}>
			<ul class="l:switcher:sm bp:xxs">
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a data-sveltekit-preload-data href="/" on:click={handleClickOutsideMainNav}>Home</a>
				</li>
				{#each items.main as { slug, title }}
					<li aria-current={$page.url.pathname.startsWith(`/${slug}`) ? 'page' : undefined}>
						<a data-sveltekit-preload-data href={`/${slug}`} on:click={handleClickOutsideMainNav}>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div
		class={`l:side l:reveal:auto bp:${breakpoint} align:end`}
		use:clickOutside
		on:clickOutside={handleClickOutsideSettings}
	>
		<button
			id={`${id}-app-settings-button`}
			class={`font:sm outline`}
			aria-expanded={settingsExpanded}
			aria-controls={`${id}-settings-menu`}
			on:click={toggleSettings}
		>
			{format.formatLabel('Settings', '🎛️')}
		</button>
		<menu class={showSettings}>
			{#each items.side as { id, title, action, url, asset, variant, size }}
				{#if url}
					<a class={`${variant} ${asset} font:${size}`} href={url} target="_blank" rel="noreferrer">
						<ActionLabel {title} {id} theme={themes[$currentTheme]} {asset} {variant} />
					</a>
				{:else if action}
					<button on:click={actions[action]} class={`${variant} font:${size} outline`}>
						<ActionLabel {title} {id} theme={themes[$currentTheme]} {asset} {variant} />
					</button>
					<!-- {#if subitems}
						<div class={actionsClass}>
							<menu class="l:switcher bp:xxs">
								<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>

								<button>Login</button>
								<div class="l:stack l:reveal sm">
									<button class="md" type="button" on:click={setLanguage}>{langIcon}</button>
									<menu class={actionsClass}>
										<button type="button" on:click={toggleTheme}
											>{themeIcon}&nbsp;&nbsp;Theme</button
										>
										<button type="button" on:click={setLanguage}>{langIcon}</button>
										button>Login</-button
									</menu>
								</div>
							</menu>
						</div>
					{/if} -->
				{/if}
			{/each}
		</menu>
	</div>
</header>
