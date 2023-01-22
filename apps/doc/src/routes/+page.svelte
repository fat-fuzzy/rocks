<script>
	import welcome from '$lib/images/001-intro.jpeg'
</script>

<svelte:head>
	<title>Fat Fuzzy Doc | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<section class="l-text:xl l-center">
	<header>
		<h1>Welcome to Fat Fuzzy Doc!</h1>
		<h2>This is the documentation for the Fat Fuzzy Rocks project</h2>
	</header>
	<picture class="card:lg">
		<img src={welcome} alt="Creating a Webapp: where to start ?" />
	</picture>
</section>
