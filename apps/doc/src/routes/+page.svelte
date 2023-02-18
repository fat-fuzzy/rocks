<script lang="ts">
	let theme = 1
	$: variant = theme ? `bg:accent` : `bg:highlight`
</script>

<svelte:head>
	<title>Fat Fuzzy Doc | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<header>
	<h1>Fat Fuzzy Rocks</h1>
	<p>Welcome to the Fat Fuzzy Doc !</p>
</header>

<section class="l:burrito:xxl">
	<h2>✨ Highlights</h2>
	<div class="l:stack:xl">
		<article class={`card:lg font:lg align:center ${variant}`}>
			<span>🌈</span>
			<a data-sveltekit-preload-data href="/ui">UI</a>
		</article>
		<article class={`card:lg font:lg align:center ${variant}`}>
			<span>💡</span>
			<a data-sveltekit-preload-data href="/log">LOG</a>
		</article>
	</div>
</section>
