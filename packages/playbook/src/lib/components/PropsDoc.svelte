<script lang="ts">
	import type {Meta} from '$lib/props/types'

	type Props = { meta: Meta  }

	let { meta }: Props = $props()
</script>

{#snippet comingSoon()}
	<div class="card:lg text:center">
		<p class={`font:xl`}>🐰</p>
		<p class={`font:md`}>Coming soon!</p>
	</div>
{/snippet}

{#if !meta}
	{@render comingSoon()}
{:else}
	{#if meta.props_style}
	{@const blocks = meta.props_style.blocks}
	{@const layouts = meta.props_style.layouts}
		<details open class="l:stack:md size:xs">
			<summary class="surface:2:primary">Style Props</summary>
			<ul class="tags l:switcher:md">
				{#if blocks}
					{@const blockStyles = Object.keys(blocks)}
					{#each blockStyles as prop}
						{@const blocksProps = blocks[prop]}
						{#each blocksProps as style}
							<li class="card:2xs font:sm surface:1:primary">{style}</li>
						{/each}
					{/each}
				{/if}
				{#if layouts}
					{@const layoutStyles = Object.keys(layouts)}
					{#each layoutStyles as prop}
						{@const layoutsProp = layouts[prop]}
						{#each layoutsProp as style}
							<li class="card:2xs font:sm surface:1:primary">{style}</li>
						{/each}
					{/each}
				{/if}
			</ul>
		</details>
	{/if}
	{#if meta.content_types}
		<details open class="l:stack:md size:xs">
			<summary class={`surface:2:highlight`}>Content Type</summary>
			<ul class="tags l:switcher:md">
				{#each meta.content_types as prop}
					<li class="card:2xs font:sm surface:1:highlight">{prop}</li>
				{/each}
			</ul>
		</details>
	{/if}
	{#if meta.props_state}
		<details open class="l:stack:md size:xs">
			<summary class={`surface:2:accent`}>State Props</summary>
			<ul class="tags l:switcher:md">
				{#each meta.props_state as prop}
					<li class="card:2xs font:sm surface:1:accent">{prop}</li>
				{/each}
			</ul>
		</details>
	{/if}
{/if}
