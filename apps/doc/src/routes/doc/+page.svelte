<script lang="ts">
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let title = 'What is Fat Fuzzy ?'
	let description = 'About Fat Fuzzy Rocks and the projects it contains'
</script>

<PageMain {title} {description} size="md">
	<section class="l:center:2xl">
		<div class="l:text:xl">
			<p>
				This is a <a href="https://kit.svelte.dev" class="font:md">SvelteKit</a>
				app. You can make your own by typing the following into your command line
				and following the prompts:
			</p>

			<pre>npm create svelte@latest</pre>

			<p>
				The page you're looking at is purely static HTML, with no client-side
				interactivity needed. Because of that, we don't need to load any
				JavaScript. Try viewing the page's source, or opening the devtools
				network panel and reloading.
			</p>
		</div>
	</section>
</PageMain>
