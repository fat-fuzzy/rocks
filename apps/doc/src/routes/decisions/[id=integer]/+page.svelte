<script lang="ts">
	import {page} from '$app/stores'

	let title: string
	let year: string
	$: decision = $page.data.decisions.find((d)=> d.path === $page.data.path)
	$: title = decision.meta.title
	$: year = decision.meta.year
	$: html = $page.data.html
</script>

<article class="l-text">
	<h1>{title}</h1>
	<p>Published: {year}</p>
	{@html html}
</article>
