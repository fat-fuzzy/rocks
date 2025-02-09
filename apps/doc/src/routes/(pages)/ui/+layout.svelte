<script lang="ts">
	import type FatFuzzyStore from '$lib/stores/stores.svelte'
	import type {Snippet} from 'svelte'

	import {onMount, getContext, setContext} from 'svelte'
	import {page} from '$app/state'
	import {api} from '@fat-fuzzy/playbook'
	const {Playbook} = api

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let fatFuzzyStore: FatFuzzyStore = getContext('fatFuzzyStore')

	let playbookContext = api.stylesApi.initStyles()
	setContext('playbookContext', playbookContext)

	let {styles} = $state(page.data)
	let sidebar = $derived(page.data.sidebar)

	onMount(() => {
		if (styles) {
			playbookContext.applyStyles(styles)
		}
	})
</script>

<Playbook app={fatFuzzyStore.app} nav={sidebar}>
	{#if children}
		{@render children()}
	{/if}
</Playbook>
