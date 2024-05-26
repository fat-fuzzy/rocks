<script lang="ts">
	import {page} from '$app/stores'

	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless

	let category = $page.params.category
	let markdowns = $page.data.markdowns
	let title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	let content = markdowns[category].find(({meta}) => meta.slug === category)
	let headerClass = `l:grid:header:doc bp:xs bg:polar`
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="main">{title} | Doc</h1>
</header>

<article class="l:sidebar:xs">
	<section class="l:main card:md">
		<div class="l:text:lg">{@html content.html}</div>
	</section>
	<aside class="l:side">
		{#if !content.meta}
			<p class="feedback bare emoji:default">Coming Soon!</p>
		{:else if content.meta.props_style}
			<details open>
				<summary class={`bg:primary:light box:primary:light`}>
					Style Props
				</summary>
				<ul class="tags l:switcher:md">
					{#each content.meta.props_style as prop}
						<li class="card:sm bg:primary:lightest">{prop}</li>
					{/each}
				</ul>
			</details>
		{/if}
	</aside>
</article>
