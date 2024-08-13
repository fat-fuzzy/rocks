<script lang="ts">
	import {getContext} from 'svelte'
	import {enhance} from '$app/forms'
	import fatFuzzyUi from '@fat-fuzzy/ui'
	import Api from '$lib/components/Api.svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	const {DEFAULT_TABS, TABS} = fatFuzzyUi.constants

	const {ToggleMenu} = fatFuzzyUi.recipes

	type Props = {
		path: string
		actionPath: string
		redirect: string
		meta: any
		title: any
	}

	let {path, actionPath, redirect, title, meta}: Props = $props()

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')

	const tabs = TABS

	let currentTabs = playbookStore.currentTabs
	let currentTab = $state(currentTabs.ui || DEFAULT_TABS[0])

	function handleTabChange(
		selected: {name: string; value?: string | number; state: string}[],
	) {
		if (selected.length === 0) {
			return
		}
		let tab = selected[0]
		currentTab = {
			...tab,
			value: tab.value ? String(tab.value) : '',
			title: tab.name,
			id: tab.name,
		}
		playbookStore.currentTabs.ui = currentTab
	}
</script>

<h1 class="l:side hug maki:block:md">{title}</h1>
<div class="l:main l:flex reverse">
	<form
		method="POST"
		class="tabs"
		action={`${actionPath}?/updateTab&redirectTo=${redirect}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
	>
		<ToggleMenu
			id={`submit.${path}`}
			items={tabs.map((tab) => {
				if (tab.value == currentTab.value) {
					tab.initial = 'active'
				}
				return tab
			})}
			size="md"
			layout="flex nowrap"
			container="card:md"
			color="primary"
			shape="round"
			variant="outline"
			onupdate={handleTabChange}
			init={handleTabChange}
		/>
	</form>
	{#if currentTab.value === 'playbook'}
		<Api categories={['app']} {meta} {path} {actionPath} {redirect} />
	{/if}
</div>
