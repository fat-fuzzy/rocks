<script lang="ts">
	import type {Snippet} from 'svelte'
	import {setContext} from 'svelte'
	import playbook from '@fat-fuzzy/playbook'
	import PlaybookSettings from '$lib/forms/actions/playbook-settings.svelte'
	import {page} from '$app/state'

	const {StylesApi, Playbook} = playbook

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let playbookSettings = new PlaybookSettings()
	let context = new StylesApi()
	setContext('playbookContext', context)
	setContext('playbookSettings', playbookSettings)
</script>

<Playbook app={{settings: page.data.settings}}>
	{@render children()}
</Playbook>
