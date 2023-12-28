<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleProps} from '$lib/api/props/types'

	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import {
		stores,
		api,
		tokens,
		blocks,
		layouts,
		recipes,
		graphics,
		constants,
		headless,
		utils,
	} from '$lib'

	const {DEFAULT_TABS, TABS} = constants
	const {Head} = headless
	const {Element, Api} = api
	const {ToggleMenu} = recipes
	const actionPath = '/test'
	const tabs = TABS
	let props: StyleProps

	let currentTabs = stores.ui.currentTabs
	let currentTab = $currentTabs.ui || DEFAULT_TABS[0]

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
		graphics: graphics,
	}

	let category: string
	let title: string
	let Component: ComponentType

	function handleTabChange(event: CustomEvent) {
		stores.ui.currentTabs.set({ui: event.detail.selected[0]})
	}

	$: category = $page.params.category
	$: title = $page.params.component
	$: Component = categoryItems[category][title]
	$: path = $page.url.pathname
	$: currentTab = $currentTabs.ui
	$: markdowns =
		$page.data.markdowns && $page.data.markdowns[category] ? $page.data.markdowns[category] : []
	$: content = markdowns.find(({meta}) => meta.title === title) || {
		html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
	}
	$: headerClass = 'page-header card:md bg:polar'
	$: props = utils.props.getElementProps(content.meta)
</script>

<Head {title} page="Test" description={`${title} Test Page`} />

<header class={headerClass}>
	<h1 class="card:sm md">{title}</h1>

	<div class="l:switcher:xs wrap:reverse">
		{#if currentTab.value === 'demo'}
			<Api categories={['app']} {path} {actionPath} redirect={$page.url.pathname} />
		{/if}
		<form
			method="POST"
			class="l:switcher:sm align:center maki lg"
			action={`/test?/updateTab&redirectTo=${$page.url.pathname}`}
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
						tab.initial = 'pressed'
					}
					return tab
				})}
				layout="flex:end"
				size="md"
				container="card:md"
				color="primary"
				shape="round"
				variant="outline"
				formaction={`/test?/updateTab&redirectTo=${$page.url.pathname}`}
				on:click={handleTabChange}
			/>
		</form>
	</div>
</header>

{#if content.html && currentTab.value === 'doc'}
	<article class="l:sidebar:xs">
		<section class="l:main card:md">
			<div class="l:text:lg">{@html content.html}</div>
		</section>
		<aside class="l:side">
			{#if !content.meta}
				<p class="feedback bare emoji:default">Coming Soon!</p>
			{:else}
				{#if content.meta.props_style}
					<details open>
						<summary class={`bg:primary:light box:primary:light`}>Style Props</summary>
						<ul class="tags l:switcher:md">
							{#if props.doc}
								{#each props.doc as docs}
									{#if docs.tokens}
										{#each docs.tokens as prop}
											<li class="card:sm bg:primary:lightest">{prop}</li>
										{/each}
									{/if}
									{#if docs.blocks}
										{#each docs.blocks as prop}
											<li class="card:sm bg:primary:lightest">{prop}</li>
										{/each}
									{/if}
									{#if docs.layouts}
										{#each docs.layouts as prop}
											<li class="card:sm bg:primary:lightest">{prop}</li>
										{/each}
									{/if}
								{/each}
							{/if}
						</ul>
					</details>
				{/if}
				{#if content.meta.content_type}
					<details open>
						<summary class={`bg:primary:light box:primary:light`}>Content Type</summary>
						<ul class="tags l:switcher:md">
							{#each content.meta.content_type as prop}
								<li class="card:sm bg:highlight:lightest">{prop}</li>
							{/each}
						</ul>
					</details>
				{/if}
				{#if content.meta.props_state}
					<details open>
						<summary class={`bg:primary:light box:primary:light`}>State Props</summary>
						<ul class="tags l:switcher:md">
							{#each content.meta.props_state as prop}
								<li class="card:sm bg:accent:lightest">{prop}</li>
							{/each}
						</ul>
					</details>
				{/if}
			{/if}
		</aside>
	</article>
{:else if currentTab.value === 'demo'}
	<Element
		isPage={true}
		depth={1}
		{title}
		{path}
		{category}
		component={Component}
		meta={content.meta}
		{actionPath}
		redirect={$page.url.pathname}
	/>
{/if}
