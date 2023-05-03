<script lang="ts">
	import {page} from '$app/stores'
	import {clickOutside} from '../../utils/click-outside.js'
	import {lang} from '$stores/intl'
	import {theme} from '../../stores/theme'
	import {emojis, themes} from '$types/constants.js'

	// TODO: make svg css themeable / fix dark theme
	import githubDay from '$lib/images/night/icon-github.svg'
	import github from '$lib/images/day/icon-github.svg'

	export let className = 'header-app'
	export let breakpoint = 'md'
	export let id = 'main-nav'
	export let height = ''
	export let links = [{slug: 'about', title: 'About'}]

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

	function toggleReveal(event) {
		navExpanded = !navExpanded
	}

	function toggleTheme(event) {
		const _theme = $theme ? 0 : 1
		theme.set(_theme)
	}

	function setLanguage(event) {
		lang.set(event.detail)
	}

	$: headerClass = `${className} l:sidebar md layer sticky:top`
	$: show = navExpanded ? 'layer polar show' : 'hide:viz-only'
	$: actionsClass = actionsExpanded ? 'layer polar show' : 'hide:viz-only'
	$: currentTheme = themes[$theme]
	$: currentLang = $lang
	$: themeIcon = emojis[currentTheme]
	$: langIcon = emojis[currentLang]
	$: setHeight = height ? ` h:${height}` : ''
</script>

<header class={headerClass}>
	<div
		class={`l:main l:reveal ${setHeight}`}
		use:clickOutside
		on:clickOutside={handleClickOutsideMainNav}
	>
		<button
			{id}
			class={`font:sm`}
			aria-expanded={navExpanded}
			aria-controls={`nav-${id}`}
			on:click={toggleReveal}
		>
			🐣 Menu
		</button>

		<nav id="primary-navigation" class={show}>
			<ul class="l:switcher bp:xxs" id={`nav-${id}`}>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a data-sveltekit-preload-data href="/" on:click={handleClickOutsideMainNav}>Home</a>
				</li>
				{#each links as { slug, title }}
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
			<button on:click={toggleTheme} class="polar font:sm round">
				{themeIcon}
			</button>
			<div class="corner font:sm">
				<a href="https://github.com/fat-fuzzy/rocks" target="_blank" rel="noreferrer">
					<img src={github} alt="GitHub" />
				</a>
			</div>
			<!--button
				type="button"
				class="md toggle collapse primary"
				aria-navExpanded={actionsExpanded}
				on:click={toggleActionsMenu}
			>
				🎛 &nbsp;Settings
			</!--button>
			<div class={actionsClass}>
				<menu class="l:switcher bp:xxs">
					<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>

					<button>Login</-button>
					<div class="l:stack l:reveal sm">
						<button class="md" type="button" on:click={setLanguage}>{langIcon}</button>
						<!-- <menu class={actionsClass}>
						<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>
						<button type="button" on:click={setLanguage}>{langIcon}</button>
						<!--button>Login</-button -- >
					</menu>
					</div>
				</menu>
			</div> -->
		</menu>
	</div>
</header>
