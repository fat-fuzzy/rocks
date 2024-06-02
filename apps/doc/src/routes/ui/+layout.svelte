<script lang="ts">
	import {onMount, setContext, type Snippet} from 'svelte'
	import {page} from '$app/stores'
	import {api} from '@fat-fuzzy/playbook'
	const {Playbook} = api

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let stylesApi = api.stylesApi.initStyles()
	setContext('stylesApi', stylesApi)

	let {styles} = $state($page.data)

	onMount(() => {
		stylesApi.applyStyles(styles)
	})
</script>

<Playbook redirect={$page.url.pathname} >
	{#if children}
		{@render children()}
	{/if}
</Playbook>
