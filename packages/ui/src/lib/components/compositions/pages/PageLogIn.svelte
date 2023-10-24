<script lang="ts">
	import {page} from '$app/stores'
	let title = 'Log In'
	let description = 'A log in page template'
	import PageHeader from '$lib/components/compositions/headers/PageHeader.svelte'
	import LogIn from '$lib/components/compositions/forms/LogIn.svelte'
	export let redirectTo: string = ''
	// export let action: string = '/login'
	export let action: string = ''

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
