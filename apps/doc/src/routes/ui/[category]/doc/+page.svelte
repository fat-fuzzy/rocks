<script lang="ts">
	import {content} from '@fat-fuzzy/ui-s5'
	import {page} from '$app/stores'

	const {PageMain} = content

	let category = $derived($page.params.category)
	let markdowns = $derived($page.data.markdowns)
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Doc`)
	let markdownContent = $derived(
		markdowns[category].find(({meta}) => meta.slug === category),
	)
</script>

<PageMain {title} {description}>
	<article class="l:sidebar:xs">
		<section class="l:main card:md">
			<div class="l:text:lg">{@html markdownContent.html}</div>
		</section>
		<aside class="l:side">
			{#if !markdownContent.meta}
				<p class="feedback bare emoji:default">Coming Soon!</p>
			{:else if markdownContent.meta.props_style}
				<details open>
					<summary class={`bg:primary:100`}> Style Props </summary>
					<ul class="tags l:switcher:md">
						{#each markdownContent.meta.props_style as prop}
							<li class="card:xs bg:primary:000">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</aside>
	</article>
</PageMain>
