<script lang="ts">
	import type {Meta} from '$types'

	type Props = {meta: Meta}

	let {meta}: Props = $props()
</script>

{#snippet comingSoon()}
	<div class="ravioli:lg text:center">
		<p class={`font:xl`}>🐰</p>
		<p class={`font:md`}>Coming soon!</p>
	</div>
{/snippet}

{#if !meta}
	{@render comingSoon()}
{:else}
	<!-- {#if meta.props_style}
		{@const blocks = meta.props_style.blocks}
		{@const layouts = meta.props_style.layouts}
		<details class="l:stack:2xs">
			<summary
				class="font:sm font:heading font:semi size:2xs color:primary variant:bare"
			>
				Style Props
			</summary>
			<ul class="tags l:switcher:2xs" data-testid="doc-style-props">
				{#if blocks}
					{@const blockStyles = Object.keys(blocks)}
					{#each blockStyles as prop}
						{@const blocksProps = blocks[prop]}
						{#each blocksProps as style}
							<li
								class="font:xs ravioli:3xs surface:1:primary"
								data-testid={`prop-block-${style}`}
							>
								{style}
							</li>
						{/each}
					{/each}
				{/if}
				{#if layouts}
					{@const layoutStyles = Object.keys(layouts)}
					{#each layoutStyles as prop}
						{@const layoutsProp = layouts[prop]}
						{#each layoutsProp as style}
							<li
								class="font:xs ravioli:3xs surface:1:primary"
								data-testid={`prop-layout-${style}`}
							>
								{style}
							</li>
						{/each}
					{/each}
				{/if}
			</ul>
		</details>
	{/if} -->
	{#if meta.props_state}
		<details class="l:stack:2xs">
			<summary
				class="font:sm font:heading font:semi size:2xs color:primary variant:bare"
			>
				State Props
			</summary>
			<ul class="tags l:switcher:2xs" data-testid="doc-state-props">
				{#each meta.props_state as prop}
					<li
						class="font:xs ravioli:3xs surface:1:primary"
						data-testid={`prop-state-${prop}`}
					>
						{prop}
					</li>
				{/each}
			</ul>
		</details>
	{/if}
	{#if meta.content_types}
		<details class="l:stack:2xs">
			<summary
				class="font:sm font:heading font:semi size:2xs color:highlight variant:bare"
			>
				Children
			</summary>
			<ul class="tags l:switcher:2xs" data-testid="doc-child-props">
				{#each meta.content_types as prop}
					<li
						class="font:xs ravioli:3xs surface:1:highlight"
						data-testid={`prop-child-${prop}`}
					>
						{prop}
					</li>
				{/each}
			</ul>
		</details>
	{/if}
{/if}
