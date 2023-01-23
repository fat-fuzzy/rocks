<script lang="ts">
	const variant = `accent`
</script>

<svelte:head>
	<title>Fat Fuzzy Doc | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<section class="l-text:xl l-center">
	<header>
		<h1>Fuzzy Rocks</h1>
		<h2>Welcome to the Fat Fuzzy Doc !</h2>
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
</section>
