<script lang="ts">
	import {getStores} from '$app/stores'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/compositions/headers/PageHeader.svelte'

	export let title = 'Page Title'
	export let description = 'A page template with slots for authed vs unauthed content'

	let page = getStores().page

	$: session = {...$page.data.session}
</script>

<Head {title} {description} />

<PageHeader {title} size="xxl" />

{#if session.user}
	<slot name="authed" />
{:else}
	<slot name="uauthed" />
{/if}
