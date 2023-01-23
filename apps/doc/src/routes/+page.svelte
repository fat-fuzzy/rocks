<script lang="ts">
	const variant = `accent`
</script>

<svelte:head>
	<title>Fat Fuzzy Doc | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<header>
	<h1>Fat Fuzzy Rocks</h1>
	<p>Welcome to the Fat Fuzzy Doc !</p>
</header>

<section class="l-text:md l-center">
	<h2>✨ Highlights</h2>
	<ul class="l-stack xl" role="group">
		<li class={`card ${variant}`}>
			<span>🌈</span>
			<a data-sveltekit-preload-data href="/ui">UI Library</a>
		</li>
		<li class={`card ${variant}`}>
			<span>💡</span>
			<a data-sveltekit-preload-data href="/decisions">Decisions</a>
		</li>
	</ul>
</section>
