<script lang="ts">
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import type {RevealNavProps} from './nav.types.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import LinkList from '$lib/components/recipes/navs/LinkList.svelte'

	import * as ui from '$lib/stores/ui.js'

	const {
		DEFAULT_APP_SETTINGS,
		DEFAULT_NAV_REVEAL_STATE,
		ALIGN_OPPOSITE,
		ALIGN_ANIMATION_DIRECTION,
		TRANSITION_CONTRAST,
	} = constants

	let {
		id = 'reveal-nav',
		title = 'RevealNav',
		path = '',
		method = 'POST',
		reveal = 'minimize',
		formaction,
		actionPath,
		redirect,
		layout,
		direction = 'tb-lr',
		color,
		size,
		breakpoint,
		threshold,
		variant,
		align = 'start',
		place = 'top',
		position,
		container,
		height,
		background = 'polar',
		asset,
		content,
		settings = ui,
		items = [],
		onupdate,
	}: RevealNavProps = $props()

	let sidebarReveal = $state(reveal ? {reveal} : DEFAULT_NAV_REVEAL_STATE)
	let appSettings = $state(DEFAULT_APP_SETTINGS)

	function toggleReveal(event) {
		sidebarReveal.reveal = event.value
		if (onupdate)
			onupdate({name: id, value: event.value, state: sidebarReveal.reveal})
	}

	let formClasses = $derived(`form:${sidebarReveal.reveal}`)
	let buttonAlign = place ? ALIGN_OPPOSITE[align] : ''
	let navContainer = container ? `${container}:${size}` : ''
	let navLayoutThreshold = breakpoint
		? ` bp:${breakpoint}`
		: threshold
			? ` th:${threshold}`
			: ''
	let navLayout = layout ? `l:${layout}:${size} ${navLayoutThreshold}` : ''
	let animationDirection = $derived(
		place ? ALIGN_ANIMATION_DIRECTION[place][sidebarReveal.reveal] : '',
	)
	let showBackground = $derived(
		background
			? `bg:${background}`
			: `bg:${TRANSITION_CONTRAST[appSettings.contrast]}`,
	)
	let showSidebar = $derived(
		`${sidebarReveal.reveal} ${showBackground} ${place}`,
	)
	let navClasses = $derived(
		`content ${navLayout} ${navContainer} ${showSidebar} align:${align} ${size} `,
	)
	let layoutClasses = $derived(
		position
			? `l:reveal ${position} ${place} ${sidebarReveal.reveal}`
			: `l:reveal ${place} ${reveal}`,
	)
	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
</script>

<div class={layoutClasses}>
	<form
		{id}
		{method}
		action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={formClasses}
	>
		<Expand
			id={`button-expand-${id}`}
			{variant}
			{title}
			{size}
			{color}
			name={`button-${id}`}
			align={buttonAlign}
			controls={`nav-${id}`}
			value={sidebarReveal.reveal}
			states={{
				expanded: {
					id: 'show',
					text: title,
					value: 'show',
					asset: `point-${animationDirection}`,
				},
				collapsed: {
					id: 'minimize',
					text: title,
					value: 'minimize',
					asset: `point-${animationDirection}`,
				},
			}}
			onclick={toggleReveal}
		>
			{title}
		</Expand>
	</form>
	<nav id={`nav-${id}`} class={navClasses} aria-label={title}>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</nav>
</div>
