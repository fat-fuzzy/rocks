<script lang="ts">
	import type {HeaderProps} from '$types'
	import constants from '$lib/types/constants.js'
	import SkipLinks from '$lib/components/blocks/global/SkipLinks.svelte'
	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import Settings from '$lib/components/recipes/header/Settings.svelte'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'header-app',
		breakpoint = 'sm',
		path,
		formaction,
		items,
	}: HeaderProps = $props()
	let className = 'header-app'

	let navReveal = $state(DEFAULT_REVEAL_STATE)
	let reveal = $derived(navReveal.reveal)
</script>

<header class="sticky:top">
	<div class={`l:sidebar ${className}`}>
		<div class="l:main">
			<SkipLinks />
			<Reveal
				{id}
				name={id}
				label=""
				element="nav"
				title="Menu"
				size="xs"
				variant="outline"
				asset="home"
				justify="start"
				dismiss="outside"
				auto={true}
				{reveal}
				{breakpoint}
				{formaction}
			>
				<ul class="l:switcher:sm unstyled color:primary">
					<li aria-current={path === '/' ? 'page' : undefined}>
						<a data-sveltekit-preload-data href="/">Home</a>
					</li>
					{#each items.links as { slug, title }}
						<li
							aria-current={path?.startsWith(`/${slug}`) ? 'page' : undefined}
						>
							<a data-sveltekit-preload-data href={`/${slug}`}>
								{title}
							</a>
						</li>
					{/each}
				</ul>
			</Reveal>
		</div>
		<div class="l:side">
			<Settings
				name={`${id}-settings`}
				label=""
				{path}
				{breakpoint}
				align="end"
				size="xs"
				id={`${id}-menu-settings`}
				items={items.settings}
				onupdate={items?.settings.onupdate}
			/>
		</div>
	</div>
</header>
