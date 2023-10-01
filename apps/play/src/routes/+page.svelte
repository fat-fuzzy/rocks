<script lang="ts">
	// TODO; conditional import
	// import introDay from '$lib/images/day/001-intro.png' // TODO : optimize images
	// import introNight from '$lib/images/night/001-intro.png' // TODO : optimize images

	let theme = 1
	// const pageImage = {
	// 	src: theme === 1 ? introDay : introNight,
	// 	alt: `A drawing: "Creating a web app. Where to Start ?" asks a girl underneath a large cloud with a laptop connected to it and displaying an app in a browser. The cloud contains three boards: to the left is the CLIENT, which contains HTML, CSS, and JavaScript; to the right are RESOURCES which contain backend data and application logic; in the middle is the API, which connects the CLIENT to the RESOURCES using HTTP, URLs, JSON, REST, GraphQL, and enables calls to CRUD operations.`,
	// }
	$: variant = 'bg:primary:light'
</script>

<svelte:head>
	<title>Fat Fuzzy Playground | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<header class="polar">
	<div class="l:text:xl l:center card:feature:xxl">
		<!-- <div class="l:frame l:text:xl">
			<img src={pageImage.src} alt={pageImage.alt} />
		</div> -->
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
