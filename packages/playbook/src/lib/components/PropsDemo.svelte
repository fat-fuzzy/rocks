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

<!-- <Api categories={['app']} {meta} {path} {actionPath} {redirect} /> -->
{#if categories && categories.length > 0 && meta.props_style}
	<Api {categories} {path} {actionPath} {redirect} {meta} />
{:else}
	{@render comingSoon()}
{/if}
