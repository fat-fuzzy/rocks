<script lang="ts">
	import {page} from '$app/stores'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import {lang} from '$stores/intl'
	import {theme} from '$lib/stores/theme.js'

	import ActionLabel from '$lib/components/blocks/global/ActionLabel.svelte'

	export let className = 'header-app'
	export let breakpoint = 'md'
	export let background = 'polar'
	export let id = 'ui'
	export let height = ''

	export let items = {
		main: [{slug: 'about', title: 'About'}],
		side: [
			{
				id: 'button-theme',
				title: 'Theme',
				action: 'theme',
				asset: 'day', // Fix asset per theme
				type: 'emoji',
				variant: 'round',
			},
			{
				id: 'link-github',
				title: 'GitHub icon',
				url: 'https://github.com/fat-fuzzy/rocks',
				asset: 'day', // Fix asset per theme
				type: 'icon',
				variant: 'round',
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
	let actionsExpanded = false

	function handleClickOutsideMainNav(event) {
		navExpanded = false
	}

	function handleClickOutsideActionsMenu(event) {
		actionsExpanded = false
	}

	function toggleActionsMenu(event) {
		actionsExpanded = !actionsExpanded
	}

	function toggleNav(event) {
		navExpanded = !navExpanded
	}

	function toggleTheme(event) {
		const _theme = $theme ? 0 : 1
		theme.set(_theme)
	}

	function setLanguage(event) {
		lang.set(event.detail)
	}

	const actions: {[key: string]: (event) => void} = {
		nav: toggleNav,
		actions: toggleActionsMenu,
		theme: toggleTheme,
		language: setLanguage,
	}

	$: headerClass = `${className} l:sidebar md layer sticky:top bg:${background}`
	$: show = navExpanded ? `layer bg:${background} show` : 'hide:viz-only'
	$: actionsClass = actionsExpanded ? `layer bg:${background} show` : 'hide:viz-only'
	$: setHeight = height ? ` h:${height}` : ''
</script>

<header class={headerClass}>
	<div
		class={`l:main l:reveal:nav ${setHeight}`}
		use:clickOutside
		on:clickOutside={handleClickOutsideMainNav}
	>
		<button
			id={`${id}-primary-nav-button`}
			class={`font:sm`}
			aria-expanded={navExpanded}
			aria-controls={`${id}-primary-nav`}
			on:click={toggleNav}
		>
			🐣 Menu
		</button>

		<nav id={`${id}-primary-nav`} class={show}>
			<ul class="l:switcher bp:xxs">
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

	<div class="l:side">
		<menu
			class={`l:reveal:sm bp:${breakpoint}`}
			use:clickOutside
			on:clickOutside={handleClickOutsideActionsMenu}
		>
			{#each items.side as { title, action, url, asset, type, variant, subitems }}
				{#if url}
					<a class={variant} href={url} target="_blank" rel="noreferrer">
						<ActionLabel {title} {type} {asset} {variant} />
					</a>
				{:else if action}
					<button on:click={actions[action]} class={variant}>
						<ActionLabel {title} {type} {asset} {variant} />
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
