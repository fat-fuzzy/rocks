<script lang="ts">
	import {page} from '$app/stores'
	import {clickOutside} from '../../utils/click-outside.js'
	import {lang} from '../../stores/intl'
	import {theme} from '../../stores/theme'
	import {emojis, themes} from '../../types/constants'

	export let className = ''
	let actionsMenuExpanded = false
	let currentTheme = themes[$theme]
	let currentLang = $lang

	function handleClickOutside(event) {
		actionsMenuExpanded = false
	}

	function toggleActionsMenu(event) {
		actionsMenuExpanded = !actionsMenuExpanded
	}

	function toggleTheme(event) {
		const _theme = $theme ? 0 : 1
		theme.set(_theme)
	}
	function setLanguage(event) {
		lang.set(event.detail)
	}

	theme.subscribe((value) => {
		currentTheme = themes[value]
	})

	lang.subscribe((value) => {
		currentLang = value
	})

	$: mainMenuClass = `${className} l-sidebar u-main layer`
	$: actionsMenuClass = actionsMenuExpanded ? `show right` : `hide`
	$: themeIcon = emojis[currentTheme]
	$: langIcon = emojis[currentLang]
</script>

<header class={mainMenuClass}>
	<nav class="l-sidebar-main">
		<ul class="l-wrapper">
			<li class:active={$page.url.pathname === '/'} class="home">
				<a data-sveltekit-prefetch href="/">
					<span class="l-square" alt="Home">🐣</span>
					Home
				</a>
			</li>
			<li class:active={$page.url.pathname === '/play'}>
				<a data-sveltekit-prefetch href="/play">Play</a>
			</li>
			<li class:active={$page.url.pathname === '/machines'}>
				<a data-sveltekit-prefetch href="/machines">Machines</a>
			</li>
		</ul>
	</nav>
	<div class="l-sidebar-side shrink">
		<menu class="dropdown sm" use:clickOutside on:click_outside={handleClickOutside}>
			<button
				type="button"
				class="toggle collapse primary"
				aria-expanded={actionsMenuExpanded}
				on:click={toggleActionsMenu}
			>
				🎛 &nbsp;Settings
			</button>
			<div class={actionsMenuClass}>
				<menu class="l-switcher sm">
					<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>

					<!--button>Login</-button-->
					<div class="l-stack dropdown sm">
						<button type="button" on:click={setLanguage}>{langIcon}</button>
						<!-- <menu class={actionsMenuClass}>
						<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>
						<button type="button" on:click={setLanguage}>{langIcon}</button>
						<!--button>Login</-button -- >
					</menu> -->
					</div>
				</menu>
			</div>
		</menu>
	</div>
</header>
