<script lang="ts">
	export let data;
	const { title, year, Content } = data;
</script>

<article>
	<h1>{title}</h1>
	<p>Published: {year}</p>
	<Content />
</article>
