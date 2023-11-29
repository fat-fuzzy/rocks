<script lang="ts">
	$: variant = 'bg:primary:light'
</script>

<svelte:head>
	<title>Fat Fuzzy Playground | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<header class="polar">
	<div class="l:text:xl l:center card:feature:xxl">
		<h1 class="text:center">Fat Fuzzy Playground</h1>
	</div>
</header>

<section class="l:center l:text:xxl">
	<h2>✨ Highlights</h2>
	<div class="l:switcher bp:xs card:xxl">
		<article class={`card:lg text:center ${variant}`}>
			<a data-sveltekit-preload-data href="/play" class="card font:md">🌈 Play</a>
		</article>
	</div>
</section>
