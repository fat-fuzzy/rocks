<script lang="ts">
	// TODO; conditional import
	import introDay from '$lib/images/day/001-intro.png'// TODO : optimize images
	import introNight from '$lib/images/night/001-intro.png' // TODO : optimize images

	let theme = 1
	const pageImage = {
		src: theme === 1 ? introDay : introNight, 
		alt: `A drawing with a title that says: "Creating a web app." Underneath, a large cloud containing three boards: one represents an app front end, the second an app API, and the third backend resources. On the top corner, attached to the outside of the cloud is a laptop displaying an application in a browser. Underneath the cloud to the left, a girl is standing with bubbles linking her to the cloud as if the cloud were her thoughts, while she points to a board to her right that asks: "where to start?"`,
	}
	$: variant = 'bg:primary:light'
</script>

<svelte:head>
	<title>Fat Fuzzy Doc | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<div class="l:center col:center card:feature:xxl width:full polar">
	<div class="l:frame:feature  l:text:xl">
		<img src={pageImage.src} alt={pageImage.alt}  />
	</div>
	<h1>Fat Fuzzy Rocks</h1>
</div>

<section class="l:center l:text:xxl">
	<h2>✨ Highlights</h2>
	<div class="l:switcher bp:xs card:xxl">
		<article class={`card:lg text:center ${variant}`}>
			<a data-sveltekit-preload-data href="/ui" class="card font:md">🌈 UI</a>
		</article>
		<article class={`card:lg text:center ${variant}`}>
			<a data-sveltekit-preload-data href="/log" class="card font:md">✏️ LOG</a>
		</article>
	</div>
</section>
