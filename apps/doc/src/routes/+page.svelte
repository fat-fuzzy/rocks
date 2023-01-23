<script>
	import welcome from '$assets/images/pages/001-intro.jpg'
</script>

<svelte:head>
	<title>Fat Fuzzy Doc | Home</title>
	<meta name="description" content="Fat Fuzzy Rocks documentation home page" />
</svelte:head>

<section class="l-text:xl l-center">
	<header>
		<h1>Welcome to the Fat Fuzzy Doc!</h1>
		<h2>This is the documentation for the Fat Fuzzy Rocks project</h2>
	</header>
	<picture class="card:lg">
		<img src={welcome} alt="Creating a Webapp: where to start ?" />
	</picture>
</section>
