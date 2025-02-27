<script lang="ts">
	import type {Snippet} from 'svelte'

	import {onMount, setContext} from 'svelte'
	import {page} from '$app/stores'
	import {api} from '@fat-fuzzy/playbook'
	const {Playbook} = api

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookContext = api.stylesApi.initStyles()
	setContext('playbookContext', playbookContext)

	let {ui} = $state($page.data)
	let sidebar = $derived($page.data.sidebar)

	onMount(() => {
		if (ui) {
			playbookContext.applyStyles(ui)
		}
	})
</script>

<Playbook nav={sidebar}>
	{#if children}
		{@render children()}
	{/if}
</Playbook>
