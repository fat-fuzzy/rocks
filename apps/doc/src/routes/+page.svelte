<script lang="ts">
	import imageIntro from '$assets/images/pages/001-intro.jpg'
	let theme = 1
	$: variant = 'bg:primary:light'
</script>

<svelte:head>
	<title>Fat Fuzzy Doc | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<header class="l:center polar card:xxl">
	<img src={imageIntro} alt="Creating a web app: where to start?" class="l:burrito:xxl" />
	<h1>Fat Fuzzy Rocks</h1>
</header>

<section class="l:burrito:xxl">
	<h2>✨ Highlights</h2>
	<div class="l:switcher bp:xs card:xxl">
		<article class={`card:lg align:center ${variant}`}>
			<span>🌈</span>
			<a data-sveltekit-preload-data href="/ui" class="card font:lg">UI</a>
		</article>
		<article class={`card:lg font:lg align:center ${variant}`}>
			<span>✏️</span>
			<a data-sveltekit-preload-data href="/log" class="card font:lg">LOG</a>
		</article>
	</div>
</section>
