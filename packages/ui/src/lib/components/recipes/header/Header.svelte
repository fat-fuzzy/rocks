<script lang="ts">
	import type {HeaderProps} from '$types'
	import {DismissEvent} from '$types'

	import styleHelper from '$lib/utils/styles.js'
	import constants from '$lib/types/constants.js'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'
	import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'
	import Magic from '$lib/components/blocks/global/Magic.svelte'

	let {
		id = 'ui-header-app',
		breakpoint = 'sm',
		path,
		reveal,
		redirect,
		actionPath,
		formaction,
		main,
		layout,
		size,
		variant,
		color,
		font,
		position,
		placement,
		context,
	}: HeaderProps = $props()
	let className = 'header-app'

	let positionClass = position ? `${position}:${placement}` : ''

	let brightness = $derived(context.brightness)
	let contrast = $derived(context.contrast)
	let preferences = $derived.by(() => {
		let preferences = constants.APP_SETTINGS
		preferences.display[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.display[1].initial =
			contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})

	let spell = $derived(brightness === 'day' ? 'dawn' : 'dusk')
	let headerClass = $derived(
		styleHelper.getStyles({
			layout,
			size,
		}),
	)
</script>

{#snippet headerMain()}
	<SkipLinks />
	<HeaderNav
		{id}
		name={id}
		label="Menu"
		title="Menu"
		{size}
		{font}
		variant="outline"
		asset="home"
		justify="start"
		dismiss={DismissEvent.outside}
		auto={true}
		links={main}
		{path}
		{reveal}
		{breakpoint}
		{formaction}
		{actionPath}
		{redirect}
	/>
{/snippet}

{#snippet headerSide()}
	<Settings
		id={`${id}-menu`}
		items={preferences.display}
		{formaction}
		{actionPath}
		{redirect}
		onupdate={preferences.onupdate}
	/>
	<ul class="links:settings end unstyled">
		{#each preferences.links as { title, url, shape, size, asset }}
			<li>
				<a
					class={`${variant} shape:${shape} color:${color} ${asset} size:${size}`}
					href={url}
					target="_blank"
					rel="noreferrer"
					{title}
					aria-label={title}
				>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#if layout === 'grid'}
	<!-- The header tag must be provided by the parent component  -->
	<div class="app-name">
		<Magic {spell} size="xs" grow={true}>
			<p class="text:center font:heading font:sm">Home</p>
		</Magic>
	</div>
	<div class="navbar">
		{@render headerMain()}
	</div>
	<div class="app-context l:flex align:center nowrap justify:end">
		{@render headerSide()}
	</div>
{:else}
	<header class={`${positionClass} bg:inherit`}>
		<div class="app-name">
			<p class="maki:inline">Rails</p>
		</div>
		<div class={`l:sidebar ${className} align:center`}>
			<div class="l:main l:flex align:center">
				{@render headerMain()}
			</div>
			<div class="l:side l:flex size:3xs align:center">
				{@render headerSide()}
			</div>
		</div>
	</header>
{/if}
