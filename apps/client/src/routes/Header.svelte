<script>
	import {page} from '$app/stores'
	import logo from '$lib/images/svelte-logo.svg'
	import github from '$lib/images/github.svg'
</script>

<header class="header-app l:sidebar contrast box">
	<nav id="primary-navigation" class="l:main">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname === '/play' ? 'page' : undefined}>
				<a href="/play">Play</a>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>
