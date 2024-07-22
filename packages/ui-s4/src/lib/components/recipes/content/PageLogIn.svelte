<script lang="ts">
	import {getStores} from '$app/stores'
	let title = 'Log In'
	let description = 'A log in page template'
	import PageHeader from '$lib/components/recipes/headers/PageHeader.svelte'
	import LogIn from '$lib/components/recipes/forms/LogIn.svelte'
	export let redirectTo: string = ''
	// export let action: string = '/login'
	export let action: string = ''

	let page = getStores().page

	$: session = {...$page.data.session}
	$: action = redirectTo ? `/${action}?redirectTo=${redirectTo}` : action
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<PageHeader {title} size="xxl" />

{#if session.user}
	<slot name="authed" />
{:else}
	<LogIn />
{/if}
