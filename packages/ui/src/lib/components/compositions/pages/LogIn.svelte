<script lang="ts">
	import {page} from '$app/stores'
	let title = 'Log In'
	let description = 'A log in page template'
	import PageHeader from '$lib/components/compositions/headers/PageHeader.svelte'
	export let redirectTo: string

	$: session = {...$page.data.session}
	$: action = redirectTo ? `/login?redirectTo=${redirectTo}` : '/login'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<PageHeader {title} size="xxl" />

{#if session.user}
	<slot name="authed" />
{:else}
	<section class="l:text:md l:center card:lg">
		<form method="POST" class="l:stack:md" {action}>
			<label for="email">Email</label>
			<input type="text" name="email" />
			<label for="password">Password</label>
			<input type="password" name="password" />
			<button class="primary">Log In</button>
		</form>
	</section>
{/if}
