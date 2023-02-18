<script lang="ts">
	const variant = 'accent'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<header>
	<h1>Fat Fuzzy Client</h1>
	<p>Welcome to the Fat Fuzzy Doc !</p>
</header>

<section class="l:text:md l:center:md">
	<h2>✨ Highlights</h2>
	<ul class="l:stack xl" role="group">
		<li class={`card:lg font:xl ${variant}`}>
			<span>🌈</span>
			<a data-sveltekit-preload-data href="/about">About</a>
		</li>
		<li class={`card:lg font:xl ${variant}`}>
			<span>💡</span>
			<a data-sveltekit-preload-data href="/play">Play</a>
		</li>
	</ul>
</section>
