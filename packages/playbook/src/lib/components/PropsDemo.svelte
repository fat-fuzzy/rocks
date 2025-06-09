<script lang="ts">
	import type {Meta} from '$types'
	import Api from './Api.svelte'

	type Props = {
		path?: string
		actionPath?: string
		redirect?: string
		meta: Meta
		categories?: string[]
	}

	let {path = '', actionPath, redirect, meta, categories}: Props = $props()
</script>

<!-- <Api categories={['app']} {meta} {path} {actionPath} {redirect} /> -->
{#if categories && categories.length > 0 && meta.props_style}
	<Api {categories} {path} {actionPath} {redirect} {meta} />
{/if}
