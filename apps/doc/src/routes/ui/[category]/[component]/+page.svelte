<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import {
		headless,
		stores,
		api,
		tokens,
		blocks,
		layouts,
		recipes,
		graphics,
		constants,
		utils,
	} from '@fat-fuzzy/ui'

	const {Head} = headless
	const {Element, Api} = api
	const {RevealAuto} = layouts
	const {ToggleMenu} = recipes
	const actionPath = '/ui'
	const {DEFAULT_REVEAL_STATE, DEFAULT_TABS, TABS} = constants

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
		graphics: graphics,
	}

	const tabs = TABS

	let category: string
	let title: string
	let Component: ComponentType

	let revealContext: {[key: string]: string} = DEFAULT_REVEAL_STATE
	let currentTab = $page.data.currentTabs?.element || DEFAULT_TABS[0]

	const localStores = [
		stores.ui.reveal.subscribe((value) => {
			if (value) {
				revealContext = value
			}
		}),
		stores.ui.currentTab.subscribe((value) => {
			if (value) {
				currentTab = value
			}
		}),
	]

	function handleToggle(event: CustomEvent) {
		stores.ui.reveal.set(event.detail)
	}

	function handleTabChange(event: CustomEvent) {
		stores.ui.currentTab.set(event.detail.selected[0])
	}

	$: reveal = revealContext.reveal
	$: category = $page.params.category
	$: title = $page.params.component
	$: Component = categoryItems[category][title]
	$: path = $page.url.pathname
	$: markdowns =
		$page.data.markdowns && $page.data.markdowns[category] ? $page.data.markdowns[category] : []
	$: content = markdowns.find(({meta}) => meta.title === title) || {
		html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
	}
	$: headerClass = 'page-header l:switcher:md bg:polar'
	$: props = utils.props.getElementProps(content.meta)

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="l:main:30 maki lg">{title}</h1>
	<RevealAuto
		id="ui-component-app-context"
		size="sm"
		breakpoint="sm"
		color="primary"
		align="start"
		variant="outline"
		title="Context"
		formaction="toggleContext"
		{actionPath}
		{reveal}
		redirect={$page.url.pathname}
		on:toggle={handleToggle}
	>
		<div slot="content" class="ui:menu l:switcher:sm">
			{#if currentTab.value === 'demo'}
				<Api {path} {actionPath} redirect={$page.url.pathname} />
			{/if}
			<form
				method="POST"
				class="l:switcher:sm shrink"
				action={`/ui?/updateTab&redirectTo=${$page.url.pathname}`}
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
					layout="switcher"
					size="md"
					container="card:md"
					color="primary"
					variant="round outline"
					formaction={`/ui?/updateTab&redirectTo=${$page.url.pathname}`}
					on:click={handleTabChange}
				/>
			</form>
		</div>
	</RevealAuto>
</header>

{#if content.html && currentTab.value === 'doc'}
	<article class="l:sidebar:xs">
		<section class="l:main card:md">
			<div class="l:text:lg">{@html content.html}</div>
		</section>
		<aside class="l:side">
			{#if content.meta.props_style}
				<details open>
					<summary class={`bg:primary:light box:primary:light`}>Style Props</summary>
					<ul class="tags l:switcher:md">
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
