<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import constants from '$lib/types/constants'

	import Expand from '$lib/components/blocks/buttons/Expand.svelte'
	import LinkList from '$lib/components/compositions/navs/LinkList.svelte'

	import * as settings from '$stores/settings'

	const {ALIGN_OPPOSITE, ALIGN_ANIMATION_DIRECTION, TRANSITION_CONTRAST} = constants

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

	function handleClickOutside() {
		settings.sidebarReveal.set({reveal: 'minimize'})
	}

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

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<div class={layoutClasses} use:clickOutside on:clickOutside={handleClickOutside}>
	<form
		{name}
		{method}
		action={actionPath && formaction
			? `${actionPath}?/${formaction}&redirectTo=${redirect}`
			: `?/${formaction}&redirectTo=${redirect}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={revealClasses}
	>
		<Expand
			id={`${id}-reveal-sidebar-button`}
			{variant}
			{title}
			{size}
			{color}
			{name}
			align={buttonAlign}
			controls={`${id}-reveal-sidebar`}
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
	<nav id={`${id}-reveal-sidebar`} class={navClasses}>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</nav>
</div>
