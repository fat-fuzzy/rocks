<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {beforeUpdate} from 'svelte'
	import {categoryStore} from '../stores/api'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let path = ''
	export let component: ComponentType

	export let category = ''

	let ApiElement: {[category: string]: ComponentType} = {
		layouts: Layout,
		blocks: Block,
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)

	$: articleClasses = !isPage ? 'l:stack md' : ''
	// TODO: figure out a way to let user resize component container	// TODO: clean, comment
	beforeUpdate(() => {
		categoryStore.set(category)
	})
</script>

<article class={articleClasses}>
	{#if !isPage}
		<a class="primary" href={`${path}/${title}`}>
			<svelte:element this={`h${String(depth)}`} class="font:sm">{title} API 🔗</svelte:element>
		</a>
		<svelte:component this={ApiElement[category]} {component} />
	{:else}
		<Sidebar size="xs" align="end">
			<main slot="main" class="card:lg inset">
				<svelte:component this={ApiElement[category]} {component} />
			</main>
			<aside slot="side">
				<Api {title} {category} />
			</aside>
		</Sidebar>
	{/if}
</article>
