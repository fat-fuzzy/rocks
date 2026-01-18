<script lang="ts">
	import type {Snippet} from 'svelte'
	import {setContext} from 'svelte'
	import playbook from '@fat-fuzzy/playbook'
	import {page} from '$app/state'

	const {StylesApi, Playbook} = playbook

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookContext = new StylesApi()
	setContext('playbookContext', playbookContext)
</script>

<Playbook app={page.data.appContext}>
	{@render children()}
</Playbook>
