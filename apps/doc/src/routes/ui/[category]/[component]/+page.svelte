<script lang="ts">
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import {tokens, blocks, layouts, recipes, content, constants} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'
	const {DEFAULT_TABS, TABS} = constants

	const {PageMain} = content
	const {Element, Api} = api
	const {ToggleMenu} = recipes
	const actionPath = '/ui'
	const tabs = TABS

	let currentTabs = fatFuzzyStore.currentTabs
	let currentTab = $state(currentTabs.ui || DEFAULT_TABS[0])

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
	}

	let path = $derived($page.url.pathname)
	let category = $derived($page.params.category)
	let title = $derived($page.params.component)
	let description = $derived(`${title} | Doc`)
	let Component = $derived(categoryItems[category][title])
	let markdowns = $derived(
		$page.data.markdowns && $page.data.markdowns[category]
			? $page.data.markdowns[category]
			: [],
	)
	let markdownContent = $derived(
		markdowns.find(({meta}) => meta.title === title) || {
			html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
		},
	)
	let props = $derived(api.props.getElementProps(markdownContent.meta))

	function handleTabChange(selected: { name: string; value: string|number; state: string; }[]) {
		if(selected.length === 0) {
			return
		}
		currentTab = {...selected[0], value: String(selected[0].value),title: selected[0].name, id: selected[0].name}
	}
</script>

<PageMain {title} {description} size="xl">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
		<div class="l:main:50 l:flex justify:end">
			{#if currentTab.value === 'demo'}
				<Api
					categories={['app']}
					meta={markdownContent.meta}
					{path}
					{actionPath}
					redirect={$page.url.pathname}
				/>
			{/if}

			<form
				method="POST"
				class="tabs"
				action={`/ui?/updateTab&redirectTo=${path}`}
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
					container="card:md"
					color="primary"
					shape="round"
					variant="outline"
					formaction={`/ui?/updateTab&redirectTo=${path}`}
					onupdate={handleTabChange}
					init={handleTabChange}
				/>
			</form>
		</div>
	{/snippet}

	{#if markdownContent.html && currentTab.value === 'doc'}
		<article class="l:sidebar:md">
			<section class="l:main">
				<div class="l:text:lg">{@html markdownContent.html}</div>
			</section>
			<aside class="l:side l:stack:sm">
				{#if !markdownContent.meta}
					<p class="feedback bare emoji:default">Coming Soon!</p>
				{:else}
					{#if markdownContent.meta.props_style}
						<details open class="l:stack:md size:xs">
							<summary class="bg:primary:100">Style Props</summary>
							<ul class="tags l:switcher:md">
								{#if props.doc}
									{#each props.doc as docs}
										{#if docs.tokens}
											{#each docs.tokens as prop}
												<li class="card:xs font:sm bg:primary:000">{prop}</li>
											{/each}
										{/if}
										{#if docs.blocks}
											{#each docs.blocks as prop}
												<li class="card:xs font:sm bg:primary:000">{prop}</li>
											{/each}
										{/if}
										{#if docs.layouts}
											{#each docs.layouts as prop}
												<li class="card:xs font:sm bg:primary:000">{prop}</li>
											{/each}
										{/if}
									{/each}
								{/if}
							</ul>
						</details>
					{/if}
					{#if markdownContent.meta.markdownContent_type}
						<details open class="l:stack:md size:xs">
							<summary class={`bg:primary:100`}>Content Type</summary>
							<ul class="tags l:switcher:md">
								{#each markdownContent.meta.markdownContent_type as prop}
									<li class="card:xs font:sm bg:highlight:000">{prop}</li>
								{/each}
							</ul>
						</details>
					{/if}
					{#if markdownContent.meta.props_state}
						<details open class="l:stack:md size:xs">
							<summary class={`bg:primary:100`}>State Props</summary>
							<ul class="tags l:switcher:md">
								{#each markdownContent.meta.props_state as prop}
									<li class="card:xs font:sm bg:accent:000">{prop}</li>
								{/each}
							</ul>
						</details>
					{/if}
				{/if}
			</aside>
		</article>
	{:else if currentTab.value === 'demo'}
	{#key Component}
		<Element
			isPage={true}
			depth={1}
			{title}
			{path}
			{category}
			component={Component}
			meta={markdownContent.meta}
			{actionPath}
			redirect={$page.url.pathname}
		/>
		{/key}
	{/if}
</PageMain>
