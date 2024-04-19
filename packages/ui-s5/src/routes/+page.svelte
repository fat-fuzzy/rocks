<div class="l:burrito:2xl">
	<h2>Welcome to your library project</h2>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>

<div class="l:center">
	<main class="l:sidebar">
		<div class="l:main:50 l:stack:md">
			<div class="palette">
				<div class="hue">
					<figure class="bg:primary:000">
						<p>primary 000</p>
					</figure>
					<figure class="bg:primary:100">
						<p>primary 100</p>
					</figure>
					<figure class="bg:primary:200">
						<p>primary 200</p>
					</figure>
					<figure class="bg:primary:300">
						<p>primary 300</p>
					</figure>
					<figure class="bg:primary:400">
						<p>primary 400</p>
					</figure>
					<figure class="bg:primary:500">
						<p>primary 500</p>
					</figure>
					<figure class="bg:primary:600">
						<p>primary 600</p>
					</figure>
				</div>

				<div class="hue">
					<figure class="bg:accent:000">
						<p>accent 000</p>
					</figure>
					<figure class="bg:accent:100">
						<p>accent 100</p>
					</figure>
					<figure class="bg:accent:200">
						<p>accent 200</p>
					</figure>
					<figure class="bg:accent:300">
						<p>accent 300</p>
					</figure>
					<figure class="bg:accent:400">
						<p>accent 400</p>
					</figure>
					<figure class="bg:accent:500">
						<p>accent 500</p>
					</figure>
					<figure class="bg:accent:600">
						<p>accent 600</p>
					</figure>
				</div>

				<div class="hue">
					<figure class="bg:highlight:000">
						<p>highlight 000</p>
					</figure>
					<figure class="bg:highlight:100">
						<p>highlight 100</p>
					</figure>
					<figure class="bg:highlight:200">
						<p>highlight 200</p>
					</figure>
					<figure class="bg:highlight:300">
						<p>highlight 300</p>
					</figure>
					<figure class="bg:highlight:400">
						<p>highlight 400</p>
					</figure>
					<figure class="bg:highlight:500">
						<p>highlight 500</p>
					</figure>
					<figure class="bg:highlight:600">
						<p>highlight 600</p>
					</figure>
				</div>
			</div>
			<div class="buttons">
				<button class="bg:primary:100 size:sm scale:minor">primary:100 minor sm</button>
				<button class="bg:primary:100 size:md scale:minor">primary:200 minor md</button>
				<button class="bg:primary:200:fill size:md scale:minor">primary:200 minor md</button>
				<button class="bg:primary:200:outline size:md scale:minor">primary:200 minor md</button>
				<button class="bg:primary:100:bare size:md scale:minor">primary:100 minor md</button>
				<button class="bg:primary:300 size:lg scale:minor">primary:300 minor lg</button>
				<button class="bg:accent:100 size:sm">accent:100 default sm</button>
				<button class="bg:accent:200 size:md">accent:200 default md</button>
				<button class="bg:accent:300 size:lg">accent:300 default lg</button>
				<button class="bg:highlight:100 size:sm scale:major">highlight:100 major sm</button>
				<button class="bg:highlight:200 size:md scale:major">highlight:200 major md</button>
				<button class="bg:highlight:300 size:lg scale:major">highlight:300 major lg</button>
			</div>
		</div>

		<article class="l:side l:stack:md">
			<div class="bg:accent:000 card:fill">
				<h3>This is a Subtitle</h3>
				<small>Lorem ipsum dolor</small>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloremque modi veniam
					aspernatur voluptatum labore dolores perspiciatis.
				</p>
			</div>
			<div class="bg:accent:000 card:outline">
				<h3>This is a Subtitle</h3>
				<small>Lorem ipsum dolor</small>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloremque modi veniam
					aspernatur voluptatum labore dolores perspiciatis.
				</p>
			</div>
			<div class="bg:accent:000 card:bare">
				<h3>This is a Subtitle</h3>
				<small>Lorem ipsum dolor</small>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloremque modi veniam
					aspernatur voluptatum labore dolores perspiciatis.
				</p>
			</div>
		</article>
	</main>
</div>

<style>
	/**
Adapted from https://github.com/argyleink/gui-challenges/tree/main/color-palettes
*/
	@layer demo.usage {
		h1 {
			font-size: 2rem;
			color: var(--ink);
		}
		small {
			color: var(--ink);
		}
	}

	@layer demo.palette {
		.palette {
			display: grid;
			grid-template-columns: auto auto auto;
			max-inline-size: fit-content;
		}
		.hue {
			display: grid;
			grid-auto-rows: 8vh;
			grid-template-columns: 1fr;
		}
		figure {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-inline: var(--ui-size-lg);
		}
	}

	@layer demo.card {
		.card {
			display: grid;
		}
	}

	@layer demo.support {
		* {
			box-sizing: border-box;
			margin: 0;
		}

		html {
			block-size: 100%;
			color-scheme: dark light;
		}

		body {
			min-block-size: 100%;
			font-family: system-ui, sans-serif;

			display: grid;
			place-content: center;
			gap: var(--gap);
			grid-auto-flow: column;
		}

		p {
			max-inline-size: 40ch;
		}

		article {
			display: grid;
			gap: 2ch;
			align-content: start;
		}
	}
</style>
