<script lang="ts">
	import type {Meta} from '$lib/props/types'
	import Api from './Api.svelte'

	type Props = {
		path?: string
		actionPath?: string
		redirect?: string
		color?: string
		meta: Meta
		categories?: string[]
	}

	let {
		path = '',
		actionPath,
		redirect,
		color = 'primary',
		meta,
		categories,
	}: Props = $props()

</script>

{#snippet comingSoon()}
	<div class="card:lg text:center">
		<p class={`font:xl`}>🐰</p>
		<p class={`font:md`}>Coming soon!</p>
	</div>
{/snippet}

<details open class="l:stack:md size:xs">
	<summary class={`variant:fill surface:2:${color}`}>Props</summary>
	{#if categories}
		<div class="ui:menu">
			<Api {categories} {path} {actionPath} {redirect} {meta} />
		</div>
	{:else}
		{@render comingSoon()}
	{/if}
</details>
