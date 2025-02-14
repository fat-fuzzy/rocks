<script lang="ts">
	import type {Snippet} from 'svelte'

	import {onMount, setContext} from 'svelte'
	import {page} from '$app/state'
	import {api} from '@fat-fuzzy/playbook'
	const {Playbook} = api

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookContext = api.stylesApi.initStyles()
	setContext('playbookContext', playbookContext)

	let {styles} = $state(page.data)
	let sidebar = $derived(page.data.sidebar)
	let settings = $derived(page.data.settings)

	onMount(() => {
		if (styles) {
			playbookContext.applyStyles(styles)
		}
	})
</script>

<Playbook app={settings} nav={sidebar}>
	{#if children}
		{@render children()}
	{/if}
</Playbook>
