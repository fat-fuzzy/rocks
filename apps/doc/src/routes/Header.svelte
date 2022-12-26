<script>
	import {page} from '$app/stores'
	import logo from '$lib/images/svelte-logo.svg'

	// TODO: make svg css themeable / fix dark theme
	import githubLight from '$lib/images/icon-dark-100-optim-github.svg'
	import github from '$lib/images/icon-dark-100-optim-github.svg'
</script>

<header class="header-app l-sidebar layer">
	<nav id="primary-navigation">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/ui') ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/ui">UI</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/decisions') ? 'page' : undefined}>
				<a data-sveltekit-preload-data href="/decisions">Decisions</a>
			</li>
		</ul>
	</nav>
	<div class="l-side">
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

<style>
	/* TODO: cleanup this css (sveltekit app styles) */
	.corner {
		height: 100%;
		width: auto;
		padding: 0.5em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: var(--doc-radius-base);
	}

	.corner img {
		height: 2.25em;
		width: 2.25em;
		object-fit: contain;
	}
</style>
