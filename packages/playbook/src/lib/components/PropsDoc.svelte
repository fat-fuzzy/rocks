<script lang="ts">
	import type {Meta} from '$types'

	type Props = {meta: Meta}

	let {meta}: Props = $props()
</script>

{#if meta}
	{#if meta.props_state}
		<details class="surface:1:primary" open>
			<summary class="color:primary font:sm font:heading ravioli:3xs">
				State Props
			</summary>
			<ul class="tags l:switcher:2xs" data-testid="doc-state-props">
				{#each meta.props_state as prop}
					<li
						class="font:xs ravioli:3xs surface:1:primary variant:bare shape:pill"
						data-testid={`prop-state-${prop}`}
					>
						{prop}
					</li>
				{/each}
			</ul>
		</details>
	{/if}
	{#if meta.content_types}
		<details class="surface:1:highlight" open>
			<summary class="color:highlight font:sm font:heading ravioli:3xs">
				Children
			</summary>
			<ul class="tags l:switcher:2xs" data-testid="doc-child-props">
				{#each meta.content_types as prop}
					<li
						class="font:xs ravioli:3xs surface:1:highlight variant:bare shape:pill"
						data-testid={`prop-child-${prop}`}
					>
						{prop}
					</li>
				{/each}
			</ul>
		</details>
	{/if}
{/if}
