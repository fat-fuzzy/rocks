<script lang="ts">
	import {headless} from '@fat-fuzzy/ui'

	const {Head} = headless

	let title = 'Playground'
	$: headerClass = 'l:flex card:sm col:center bg:polar align:center w:full'
	$: variant = 'bg:primary:light'
</script>

<Head {title} description="Fat Fuzzy Playground home page" />

<header class={headerClass}>
	<h1 class="card:md">{title}</h1>
</header>

<section class="l:center l:text:xxl">
	<h2>✨ Highlights</h2>
	<div class="l:switcher:sm bp:xs card:xxl">
		<article class={`card:lg text:center ${variant}`}>
			<a data-sveltekit-preload-data href="/play" class="card font:md">
				🌈 Play
			</a>
		</article>
	</div>
</section>
