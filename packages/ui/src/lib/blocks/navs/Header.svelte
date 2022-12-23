<script lang="ts">
	import {clickOutside} from '../../utils/click-outside.js'
	import {lang} from '$stores/intl'
	import {theme} from '../../stores/theme'
	import {emojis, themes} from '$types/constants.js'

	// TODO: make svg css themeable / fix dark theme
	import githubLight from '$lib/images/icon-dark-100-optim-github.svg'
	import github from '$lib/images/icon-dark-100-optim-github.svg'

	export let className = ''
	export let breakpoint = 'bp:md'
	export let page

	let actionsMenuExpanded = false

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

	$: mainMenuClass = `${className} l-sidebar layer`
	$: actionsMenuClass = actionsMenuExpanded ? `show right` : `hide`
	$: currentTheme = themes[$theme]
	$: currentLang = $lang
	$: themeIcon = emojis[currentTheme]
	$: langIcon = emojis[currentLang]
</script>

<header class={mainMenuClass}>
	<nav class="l-main l-burrito" aria-label="primary-navigation">
		<ul>
			<li class:active={page.url.pathname === '/'} class="home">
				<a data-sveltekit-preload-data href="/">
					<span class="l-square" alt="Home">🐣</span>
					Home
				</a>
			</li>
			<li class:active={page.url.pathname === '/play'}>
				<a data-sveltekit-preload-data href="/play">Play</a>
			</li>
			<li class:active={page.url.pathname === '/machines'}>
				<a data-sveltekit-preload-data href="/machines">Machines</a>
			</li>
		</ul>
	</nav>
	<div class="l-side">
		<menu class={`l-reveal sm ${breakpoint}`} use:clickOutside on:clickOutside={handleClickOutside}>
			<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>
			<div class="corner">
				<a href="https://github.com/fat-fuzzy/rocks" target="_blank" rel="noreferrer">
					<img src={github} alt="GitHub" />
				</a>
			</div>
			<!--button
				type="button"
				class="md toggle collapse primary"
				aria-expanded={actionsMenuExpanded}
				on:click={toggleActionsMenu}
			>
				🎛 &nbsp;Settings
			</!--button>
			<div class={actionsMenuClass}>
				<menu class="l-switcher bp:xxs">
					<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>

					<button>Login</-button>
					<div class="l-stack l-reveal sm">
						<button class="md" type="button" on:click={setLanguage}>{langIcon}</button>
						<!-- <menu class={actionsMenuClass}>
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

<style lang="scss">
	/* TODO: cleanup this css (sveltekit app styles) */
	.corner {
		width: 2em;
		height: 2em;
		margin-inline-start: 1em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: var(--ui-radius-base);
	}

	.corner img {
		height: 100%;
		width: auto;
		object-fit: contain;
	}
</style>
