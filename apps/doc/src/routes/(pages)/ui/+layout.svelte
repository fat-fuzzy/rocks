<script lang="ts">
	import {onMount, setContext, type Snippet} from 'svelte'
	import {page} from '$app/stores'
	import {api} from '@fat-fuzzy/playbook'
	import fatFuzzyStore from '$lib/stores/stores.svelte'
	const {Playbook} = api

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookContext = api.stylesApi.initStyles()
	setContext('playbookContext', playbookContext)

	let {styles} = $state($page.data)

	onMount(() => {
		if(styles){
			playbookContext.applyStyles(styles)
		}
	})
</script>

<Playbook redirect={$page.url.pathname} app={fatFuzzyStore.app}>
	{#if children}
		{@render children()}
	{/if}
</Playbook>
