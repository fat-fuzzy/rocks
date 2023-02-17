<script>
	import {page} from '$app/stores'
	import logo from '$lib/images/svelte-logo.svg'

	// TODO: make svg css themeable / fix dark theme
	import githubDay from '$lib/images/icon-dark-100-optim-github.svg'
	import github from '$lib/images/icon-dark-100-optim-github.svg'
</script>

<header class="header-app l:sidebar layer">
	<nav id="primary-navigation" class="l:main">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/usage') ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/usage">Usage</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/ui') ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/ui">UI</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/log') ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/log">Log</a>
			</li>
		</ul>
	</nav>
	<div class="l:side">
		<div class="corner">
			<a href="https://kit.svelte.dev" target="_blank" rel="noreferrer">
				<img src={logo} alt="SvelteKit" />
			</a>
		</div>
		<div class="corner">
			<a href="https://github.com/fat-fuzzy/rocks" target="_blank" rel="noreferrer">
				<img src={github} alt="GitHub" />
			</a>
		</div>
	</div>
</header>
