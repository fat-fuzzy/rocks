<script>
	const hues = [
		'primary',
		'accent',
		'highlight',
		'neutral',
		'info',
		'success',
		'warning',
		'danger'
	];
	const shades = ['000', '100', '200', '300', '400', '500', '600'];
</script>

<div class="l:burrito:2xl">
	<h2>Welcome to your library project</h2>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>

<div>
	<div class="palette l:center:2xs card:md">
		{#each hues as hue}
			<div class="hue">
				{#each shades as shade}
					<figure class={`bg:${hue}:${shade}`}>
						<p>{`bg:${hue}:${shade}`}</p>
					</figure>
				{/each}
			</div>
		{/each}
	</div>
	<main class="l:sidebar l:center:2xs">
		<div class="l:main:50 l:stack:md">
			<div class="buttons l:stack:md">
				<div class="l:flex align:end">
					<button class="bg:primary:300 size:lg scale:minor">primary:300 minor lg</button>
					<button class="bg:primary:200 size:md scale:minor">primary:200 minor md</button>
					<button class="bg:primary:100 size:sm scale:minor">primary:100 minor sm</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:accent:300 size:lg">accent:300 default lg</button>
					<button class="bg:accent:200 size:md">accent:200 default md</button>
					<button class="bg:accent:100 size:sm">accent:100 default sm</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:highlight:300 size:lg scale:major">highlight:300 major lg</button>
					<button class="bg:highlight:200 size:md scale:major">highlight:200 major md</button>
					<button class="bg:highlight:100 size:sm scale:major">highlight:100 major sm</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:primary variant:fill size:md">primary fill</button>
					<button class="bg:primary variant:outline size:md">primary outline</button>
					<button class="bg:primary variant:bare size:md">primary bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:accent variant:fill size:md">accent fill</button>
					<button class="bg:accent variant:outline size:md">accent outline</button>
					<button class="bg:accent variant:bare size:md">accent bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:highlight variant:fill size:md">highlight fill</button>
					<button class="bg:highlight variant:outline size:md">highlight outline</button>
					<button class="bg:highlight variant:bare size:md">highlight bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:neutral variant:fill size:md">default fill</button>
					<button class="bg:neutral variant:outline size:md">default outline</button>
					<button class="bg:neutral variant:bare size:md">default bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:info variant:fill size:md">info fill</button>
					<button class="bg:info variant:outline size:md">info outline</button>
					<button class="bg:info variant:bare size:md">info bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:success variant:fill size:md">success fill</button>
					<button class="bg:success variant:outline size:md">success outline</button>
					<button class="bg:success variant:bare size:md">success bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:warning variant:fill size:md">warning fill</button>
					<button class="bg:warning variant:outline size:md">warning outline</button>
					<button class="bg:warning variant:bare size:md">warning bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:error variant:fill size:md">error fill</button>
					<button class="bg:error variant:outline size:md">error outline</button>
					<button class="bg:error variant:bare size:md">error bare</button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:info variant:bare size:md shape:round emoji:info" title="info"></button>
					<button class="bg:neutral variant:bare size:md shape:round emoji:default" title="bunny"
					></button>
					<button class="bg:warning variant:bare size:md shape:round emoji:warning" title="warning"
					></button>
					<button class="bg:success variant:bare size:md shape:round emoji:success" title="success"
					></button>
					<button class="bg:error variant:bare size:md shape:round emoji:error" title="error"
					></button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:info variant:outline size:md shape:round emoji:info" title="info"
					></button>
					<button class="bg:neutral variant:outline size:md shape:round emoji:default" title="bunny"
					></button>
					<button
						class="bg:warning variant:outline size:md shape:round emoji:warning"
						title="warning"
					></button>
					<button
						class="bg:success variant:outline size:md shape:round emoji:success"
						title="success"
					></button>
					<button class="bg:error variant:outline size:md shape:round emoji:error" title="error"
					></button>
				</div>
				<div class="l:flex align:end">
					<button class="bg:info variant:fill size:md shape:round emoji:info" title="info"></button>
					<button class="bg:neutral variant:fill size:md shape:round emoji:default" title="bunny"
					></button>
					<button class="bg:warning variant:fill size:md shape:round emoji:warning" title="warning"
					></button>
					<button class="bg:success variant:fill size:md shape:round emoji:success" title="success"
					></button>
					<button class="bg:error variant:fill size:md shape:round emoji:error" title="error"
					></button>
				</div>
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
			<div class="bg:accent:000 card box:dotted">
				<h3>This is a Subtitle</h3>
				<small>Lorem ipsum dolor</small>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloremque modi veniam
					aspernatur voluptatum labore dolores perspiciatis.
				</p>
			</div>
			<div class="bg:higlight:000 card dotted">
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
			grid-template-columns: auto auto auto auto auto auto auto auto;
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
