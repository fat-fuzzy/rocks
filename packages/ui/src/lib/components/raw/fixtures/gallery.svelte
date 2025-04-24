<script lang="ts">
	let {id, theme}: {id: string; theme: string} = $props()

	let tours: {
		[key: string]: {title: string; items: {emoji: string; text: string}[]}
	} = {
		creatures: {
			title: 'Creatures Tour',
			items: [
				{emoji: 'day', text: 'Welcome!'},
				{emoji: 'moby', text: 'See the Whales'},
				{emoji: 'tiger', text: 'and the Tigers'},
				{emoji: 'otter', text: 'and the Otters'},
				{emoji: 'turtle', text: 'and the Turtles'},
				{emoji: 'ollie', text: "and don't forget the Octopuses"},
				{emoji: 'tram', text: 'on the CSS Tram'},
				{emoji: 'rainbow', text: 'Enjoy the ride!'},
			],
		},
		halloween: {
			title: 'Halloween Tour',
			items: [
				{emoji: 'fat-fuzzy', text: 'Welcome ... if you Dare!'},
				{emoji: 'vader', text: 'See the Weird Stuff'},
				{emoji: 'turtle', text: 'and the Perf issues'},
				{emoji: 'error', text: 'and the Errors'},
				{emoji: 'filters', text: 'and the Garish Colors'},
				{emoji: 'not-found', text: "and don't forget the 404s"},
				{emoji: 'tram', text: 'on the CSS Tram'},
				{emoji: 'log', text: 'Log an issue !'},
			],
		},
	}
</script>

<article>
	<h2 id={`section-${id}`} class={`color:${theme}`}>{tours[id].title}</h2>
	<ol class="unstyled l:grid:auto size:xs">
		{#each tours[id].items as { emoji, text }}
			<li>
				<div
					class={`l:frame:square surface:2:${theme} variant:bare dotted layer:1 l:stack size:md text:center justify:center`}
				>
					<span class={`emoji:${emoji}`}></span>
					<p>{text}</p>
				</div>
			</li>
		{/each}
	</ol>
</article>
