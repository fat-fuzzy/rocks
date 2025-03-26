<script lang="ts">
	import type {HeaderProps} from '$types'
	import {DismissEvent} from '$types'
	import RevealSettings from '$lib/components/recipes/forms/RevealSettings.svelte'
	import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'

	let {
		id = 'ui-header-app',
		breakpoint = 'sm',
		path,
		reveal,
		redirect,
		actionPath,
		formaction = 'updateState',
		main,
		page,
		context,
		position,
		placement,
	}: HeaderProps = $props()
	let className = 'header-app'

	let positionClass = position ? `${position}:${placement}` : ''
</script>

<header class={`${positionClass} bg:inherit`}>
	<SkipLinks />
	<div class={`${className} l:flex size:3xs align:center`}>
		<div class="l:flex align:center">
			<HeaderNav
				{id}
				name={id}
				label="Menu"
				title="Menu"
				size="xs"
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
		</div>
		<div class="l:flex align:center">
			<RevealSettings
				id={`app-settings`}
				name={`app-settings`}
				label="Settings"
				{path}
				{breakpoint}
				size="xs"
				formaction="updateSettings"
				{actionPath}
				{redirect}
				items={context.switch}
				onupdate={context.onupdate}
			>
				<ul class="links:settings end unstyled">
					{#each context.links as { title, url, shape, size, asset }}
						<li>
							<a
								class={`shape:${shape} ${asset} size:${size}`}
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
			</RevealSettings>
		</div>
	</div>
</header>
