<script lang="ts">
	import {onMount, onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants'

	import Expand from '$lib/components/blocks/buttons/Expand.svelte'
	import LinkList from '$lib/components/compositions/navs/LinkList.svelte'

	import * as settings from '$stores/settings'

	const {
		DEFAULT_SIDEBAR_REVEAL_STATE,
		ALIGN_OPPOSITE,
		ALIGN_ANIMATION_DIRECTION,
		TRANSITION_CONTRAST,
	} = constants

	const method = 'POST'
	export let size = ''
	export let breakpoint: string | undefined = undefined
	export let threshold: string | undefined = undefined
	export let container = 'card'
	export let variant = ''
	export let layout = ''
	export let color = ''
	export let background = 'polar'
	export let path = ''
	export let redirect = ''
	export let id = 'ui'
	export let title = 'RevealNav'
	export let name = 'reveal-nav'
	export let align = 'start'
	export let place = 'left'
	export let position: string | undefined = undefined
	export let formaction: string | undefined = undefined
	export let actionPath: string | undefined = undefined

	export let items: any[] = [] // TODO: fix type

	let sidebarReveal: {[key: string]: string} = {reveal: ''}
	let appSettings: {[key: string]: string} = {brightness: '', contrast: ''}

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
		settings.sidebarReveal.subscribe((value) => {
			if (value) {
				sidebarReveal = value
			}
		}),
	]

	function toggleSidebar(event: CustomEvent) {
		const updated = event.detail.expanded ? 'show' : 'minimize'
		settings.sidebarReveal.set({reveal: updated})
	}

	$: reveal = sidebarReveal.reveal
	$: contrast = appSettings.contrast
	$: buttonAlign = place ? ALIGN_OPPOSITE[align] : ''
	$: animationDirection = place ? ALIGN_ANIMATION_DIRECTION[place][reveal] : ''
	$: showBackground = background ? `bg:${background}` : `bg:${TRANSITION_CONTRAST[contrast]}`
	$: navContainer = container ? `${container}:${size}` : ''
	$: navLayoutThreshold = breakpoint ? ` bp:${breakpoint}` : threshold ? ` th:${threshold}` : ''
	$: navLayout = layout ? `l:${layout}:${size} ${navLayoutThreshold}` : ''
	$: showSidebar = `${reveal} ${showBackground} ${place}`
	$: navClasses = `content ${navLayout} ${navContainer} ${showSidebar} align:${align} ${size} `
	$: layoutClasses = `l:reveal ${position} ${place} ${reveal}`
	$: revealClasses = `form:expand`
	$: action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: undefined

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})

	onMount(() => {
		settings.sidebarReveal.set(DEFAULT_SIDEBAR_REVEAL_STATE)
	})
</script>

<div class={layoutClasses}>
	<form
		{id}
		{name}
		{method}
		action={action ? (actionPath ? `${actionPath}?/${action}` : `?/${action}`) : undefined}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={revealClasses}
	>
		<Expand
			id={`button-${id}`}
			{variant}
			{title}
			{size}
			{color}
			name={`button-${name}`}
			align={buttonAlign}
			controls={`nav-${id}`}
			value={title}
			states={{
				active: {text: title, value: 'show', asset: `emoji:point-${animationDirection}`},
				inactive: {text: title, value: 'minimize', asset: `emoji:point-${animationDirection}`},
			}}
			on:click={toggleSidebar}
		>
			{title}
		</Expand>
	</form>
	<nav id={`nav-${id}`} class={navClasses}>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</nav>
</div>
