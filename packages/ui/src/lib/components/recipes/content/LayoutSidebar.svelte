<script lang="ts">
	import type {LayoutProps} from '$types'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'
	import ToggleReveal from '$lib/components/recipes/toggle/ToggleReveal.svelte'
	import ToggleTree from '$lib/components/recipes/toggle/ToggleTree.svelte'

	let {size = 'md', sidenav, app, children}: LayoutProps = $props()
	let pathname = $derived(sidenav?.pathname || '/')
	let brightness = $derived(app?.settings?.brightness)
	let contrast = $derived(app?.settings?.contrast)
	let settingsClass = $derived(
		brightness && contrast ? `settings:${brightness}:${contrast}` : '',
	)
</script>

<div class={`l:sidebar size:${size} align-content:start ${settingsClass}`}>
	{#if sidenav}
		<div class="l:side">
			<nav
				id="sidenav"
				class="font:md width:md height:lg"
				data-testid={`sidenav-${pathname}`}
			>
				<SkipLinks
					id={`skiplinks-${pathname}`}
					text="Skip to content"
					href="#main"
				/>
				<ToggleReveal
					id="sidenav-reveal"
					label={sidenav.label ?? sidenav.title}
					asset={sidenav.asset}
					color={sidenav.color}
					background={sidenav.background}
					variant="bare"
					checked={true}
					area="gare"
					place="ouest"
					shape="square"
					scroll="y"
					layer="1"
					depth={0}
					font="sm"
					width="md"
					height="lg"
					dismiss="outside"
				>
					<ToggleTree
						{...sidenav}
						id={`sidenav-${pathname}`}
						{pathname}
						preload={true}
						depth={0}
						shape="square"
						width="full"
					/>
				</ToggleReveal>
			</nav>
		</div>
	{/if}
	<div class="l:main maki:inline">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
