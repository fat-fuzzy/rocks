<script lang="ts">
	import type {Meta} from '$types'
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
	<div class="ravioli:lg text:center">
		<p class={`font:xl`}>🐰</p>
		<p class={`font:md`}>Coming soon!</p>
	</div>
{/snippet}

<details class="l:stack:2xs size:2xs">
	<summary class={`variant:fill surface:2:neutral`}> Settings</summary>
	<Api categories={['app']} {meta} {path} {actionPath} {redirect} />
</details>
<details open class="l:stack:2xs size:2xs">
	<summary class={`variant:fill surface:2:${color}`}> Style Props</summary>
	{#if categories && categories.length > 0 && meta.props_style}
		<div class="ui:menu">
			<Api {categories} {path} {actionPath} {redirect} {meta} />
		</div>
	{:else}
		{@render comingSoon()}
	{/if}
</details>
