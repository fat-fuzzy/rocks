<script lang="ts">
	import {page} from '$app/stores'

	let title: string
	let year: string
	let content: {html: string}
	$: title = $page.data.title
	$: year = $page.data.year
	$: content = $page.data.content
</script>

<article class="l-text">
	<h1>{title}</h1>
	<p>Published: {year}</p>
	{@html content}
</article>
