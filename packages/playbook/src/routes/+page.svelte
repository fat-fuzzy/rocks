<script>
	const hues = [
		'neutral',
		'warning',
		'primary',
		'info',
		'accent',
		'success',
		'highlight',
		'danger',
	]
	const shades = ['000', '100', '200', '300', '400', '500', '600']
</script>

<div class="l:taco:xs">
	<h2>CSS Pattern library</h2>
	<p>
		CSS patterns from the package
		<a href="https://github.com/fat-fuzzy/lab/tree/dev/packages/style"
			>@fat-fuzzy/style</a
		>
	</p>
</div>

<div class="palette l:taco:xs">
	{#each hues as hue, i (i)}
		<div class="hue">
			{#each shades as shade, j (j)}
				<figure class={`bg:${hue}:${shade}`}>
					<p>{`bg:${hue}:${shade}`}</p>
				</figure>
			{/each}
		</div>
	{/each}
</div>
<main class="l:sidebar l:taco:2xs">
	<div class="l:main:50 l:stack:md">
		<div class="buttons l:stack:md">
			<div class="l:flex align:end">
				<button class="bg:primary size:lg scale:minor">primary minor lg</button>
				<button class="bg:primary size:md scale:minor">primary minor md</button>
				<button class="bg:primary size:sm scale:minor">primary minor sm</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:primary size:lg">primary default lg</button>
				<button class="bg:primary size:md">primary default md</button>
				<button class="bg:primary size:sm">primary default sm</button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:primary size:lg scale:major">primary major lg</button>
				<button class="bg:primary size:md scale:major">primary major md</button>
				<button class="bg:primary size:sm scale:major">primary major sm</button>
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
				<button class="bg:info variant:bare shape:round emoji:info" title="info"
				></button>
				<button
					class="bg:neutral variant:bare shape:round emoji:default"
					title="bunny"
				></button>
				<button
					class="bg:warning variant:bare shape:round emoji:warning"
					title="warning"
				></button>
				<button
					class="bg:success variant:bare shape:round emoji:success"
					title="success"
				></button>
				<button
					class="bg:danger variant:bare shape:round emoji:error"
					title="danger"
				></button>
			</div>
			<div class="l:flex align:end">
				<button
					class="bg:info variant:outline shape:round emoji:info"
					title="info"
				></button>
				<button
					class="bg:neutral variant:outline shape:round emoji:default"
					title="bunny"
				></button>
				<button
					class="bg:warning variant:outline shape:round emoji:warning"
					title="warning"
				></button>
				<button
					class="bg:success variant:outline shape:round emoji:success"
					title="success"
				></button>
				<button
					class="bg:danger variant:outline shape:round emoji:error"
					title="error"
				></button>
			</div>
			<div class="l:flex align:end">
				<button class="bg:info:fill shape:round emoji:info" title="info"
				></button>
				<button
					class="bg:neutral variant:fill shape:round emoji:default"
					title="bunny"
				></button>
				<button
					class="bg:warning variant:fill shape:round emoji:warning"
					title="warning"
				></button>
				<button
					class="bg:success variant:fill shape:round emoji:success"
					title="success"
				></button>
				<button
					class="bg:danger variant:fill shape:round emoji:error"
					title="danger"
				></button>
			</div>
		</div>
	</div>

	<article class="l:side l:stack:md">
		<div class="bg:primary:000 ravioli:fill layer">
			<h3>This is a Subtitle</h3>
			<h4>Lorem ipsum dolor</h4>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
				doloremque modi veniam aspernatur voluptatum labore dolores
				perspiciatis.
			</p>
		</div>
		<div class="bg:primary:000 ravioli:md variant:outline">
			<h3>This is a Subtitle</h3>
			<h4>Lorem ipsum dolor</h4>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
				doloremque modi veniam aspernatur voluptatum labore dolores
				perspiciatis.
			</p>
		</div>
		<div class="bg:accent:000 ravioli:md dotted">
			<h3>This is a Subtitle</h3>
			<h4>Lorem ipsum dolor</h4>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
				doloremque modi veniam aspernatur voluptatum labore dolores
				perspiciatis.
			</p>
		</div>
		<div class="bg:higlight:000 ravioli:md dotted">
			<h3>This is a Subtitle</h3>
			<h4>Lorem ipsum dolor</h4>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
				doloremque modi veniam aspernatur voluptatum labore dolores
				perspiciatis.
			</p>
		</div>
	</article>
</main>

<style>
	/**
Adapted from https://github.com/argyleink/gui-challenges/tree/main/color-palettes
*/
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

	@layer demo.ravioli {
		.ravioli {
			display: grid;
		}
	}

	@layer demo.support {
		* {
			box-sizing: border-box;
			margin: 0;
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
