<script lang="ts">
	import {page} from '$app/stores'
	import {clickOutside} from '../../utils/click-outside.js'
	import {lang} from '$stores/intl'
	import {theme} from '../../stores/theme'
	import {emojis, themes} from '$types/constants.js'
	import Nav from '../navs/Nav.svelte'
	import {links} from '../../data/nav'

	// TODO: make svg css themeable / fix dark theme
	import githubDay from '$lib/images/icon-dark-100-optim-github.svg'
	import github from '$lib/images/icon-dark-100-optim-github.svg'

	export let className = 'header-app'
	export let breakpoint = 'md'

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

	$: headerClass = `${className} l:sidebar layer`
	$: actionsMenuClass = actionsMenuExpanded ? `show right` : `hide`
	$: currentTheme = themes[$theme]
	$: currentLang = $lang
	$: themeIcon = emojis[currentTheme]
	$: langIcon = emojis[currentLang]
</script>

<header class={headerClass}>
	<nav id="primary-navigation">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/">Home</a>
			</li>
			{#each links as { slug, title }}
				<li aria-current={$page.url.pathname.startsWith(`/${slug}`) ? 'page' : undefined}>
					<a data-sveltekit-preload-data href={`/${slug}`}>{title}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="l:side">
		<menu
			class={`l:reveal:sm bp:${breakpoint}`}
			use:clickOutside
			on:clickOutside={handleClickOutside}
		>
			<button on:click={toggleTheme} class="polar font:sm">
				{themeIcon}&nbsp;&nbsp;Theme
			</button>
			<div class="corner font:sm">
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
				<menu class="l:switcher bp:xxs">
					<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>

					<button>Login</-button>
					<div class="l:stack l:reveal sm">
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
