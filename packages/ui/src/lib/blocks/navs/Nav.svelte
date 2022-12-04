<nav>
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/">Home</a>
		</li>
		<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
			<a href="/about">About</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/ui') ? 'page' : undefined}>
			<a href="/ui">UI</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/decisions') ? 'page' : undefined}>
			<a href="/decisions">Decisions</a>
		</li>
	</ul>
</nav>
