<script>
	const hues = [
		'neutral',
		'warning',
		'primary',
		'info',
		'accent',
		'success',
		'highlight',
		'danger'
	];
	const shades = ['000', '100', '200', '300', '400', '500', '600'];
</script>

<div class="l:center:xs">
	<h2>CSS Pattern library</h2>
	<p>
		CSS patterns from the package
		<a href="https://github.com/fat-fuzzy/lab/tree/dev/packages/style">@fat-fuzzy/style</a>
	</p>
</div>

<div class="palette l:center:xs">
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
				<button class="bg:primary variant:fill">primary fill</button>
				<button class="bg:primary variant:outline">primary outline</button>
				<button class="bg:primary variant:bare">primary bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:accent variant:fill">accent fill</button>
				<button class="bg:accent variant:outline">accent outline</button>
				<button class="bg:accent variant:bare">accent bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:highlight variant:fill">highlight fill</button>
				<button class="bg:highlight variant:outline">highlight outline</button>
				<button class="bg:highlight variant:bare">highlight bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:neutral variant:fill">default fill</button>
				<button class="bg:neutral variant:outline">default outline</button>
				<button class="bg:neutral variant:bare">default bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:info variant:fill">info fill</button>
				<button class="bg:info variant:outline">info outline</button>
				<button class="bg:info variant:bare">info bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:success variant:fill">success fill</button>
				<button class="bg:success variant:outline">success outline</button>
				<button class="bg:success variant:bare">success bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:warning variant:fill">warning fill</button>
				<button class="bg:warning variant:outline">warning outline</button>
				<button class="bg:warning variant:bare">warning bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:danger variant:fill">danger fill</button>
				<button class="bg:danger variant:outline">danger outline</button>
				<button class="bg:danger variant:bare">danger bare</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:info variant:bare shape:round emoji:info" title="info"></button>
				<button class="bg:neutral variant:bare shape:round emoji:default" title="bunny"></button>
				<button class="bg:warning variant:bare shape:round emoji:warning" title="warning"></button>
				<button class="bg:success variant:bare shape:round emoji:success" title="success"></button>
				<button class="bg:danger variant:bare shape:round emoji:error" title="danger"></button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:info variant:outline shape:round emoji:info" title="info"></button>
				<button class="bg:neutral variant:outline shape:round emoji:default" title="bunny"></button>
				<button class="bg:warning variant:outline shape:round emoji:warning" title="warning"
				></button>
				<button class="bg:success variant:outline shape:round emoji:success" title="success"
				></button>
				<button class="bg:danger variant:outline shape:round emoji:error" title="error"></button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:info:fill shape:round emoji:info" title="info"></button>
				<button class="bg:neutral variant:fill shape:round emoji:default" title="bunny"></button>
				<button class="bg:warning variant:fill shape:round emoji:warning" title="warning"></button>
				<button class="bg:success variant:fill shape:round emoji:success" title="success"></button>
				<button class="bg:danger variant:fill shape:round emoji:error" title="danger"></button>
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
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
		.hue {
			display: grid;
			grid-auto-rows: auto;
			grid-template-columns: 1fr;
		}
		figure {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: var(--ui-size);
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
