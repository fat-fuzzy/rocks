<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'
	import type {StylesApi} from '$lib/api/styles'

	import {onDestroy, getContext} from 'svelte'

	import lib from '@fat-fuzzy/lib'
	import {sketches} from '$lib/api/fixtures/js/sketches'
	import * as ui from '$stores/ui'
	import constants from '$lib/types/constants'

	const {TRANSITION_CONTRAST} = constants

	const scenes: {[key: string]: string} = {
		Sketch: '011',
		Geometry2D: '004',
		Geometry3D: '011',
	}
	export let title = ''
	export let name = title
	let currentSketch = scenes[title] ? scenes[title] : '004'
	export let component: ComponentType
	export let props: any
	export let scene = lib.gfx.sketches[currentSketch]
	export let path = ''

	export let actionPath: string | undefined = undefined
	export let redirect: string | undefined = undefined
	export let settings: any = ui

	let breakpoint = props?.breakpoint || ''
	let threshold = props?.threshold || ''
	let background = props?.background || ''
	let contrast = props?.contrast || ''
	let layout = props?.layout || ''
	let color = props?.color || ''
	let variant = props?.variant || ''
	let asset = props?.asset || ''
	let size = props?.size || '' // element's own size

	let page = ''

	const stylesApi: StylesApi = getContext('stylesApi')
	let styles: StyleTree = stylesApi.getStyleTree()

	const stores = [
		settings.styles.subscribe((value) => {
			if (value) {
				styles = stylesApi.getStyleTree()
			}
		}),
	]

	$: sketchData = sketches.find((s) => {
		return s.id === currentSketch
	})

	$: meta = sketchData?.meta

	// Graphics options
	$: geometry = scene?.geometry ?? lib.gfx.geometries.getGeometryDefaults()

	// App settings
	$: contrast = contrast ? contrast : settings.app.contrast
	$: background = contrast === 'blend' ? background : TRANSITION_CONTRAST[background]
	// Block options
	$: variant = styles.blocks?.element.variant ?? variant
	$: color = styles.blocks?.element.color ?? color
	$: size = styles.blocks?.element.size ?? size
	$: asset = sketchData?.asset ?? asset
	// Layout options
	// - [layout + breakpoint] work together
	$: layout = styles.layouts?.layout.layout ?? layout
	$: threshold = styles.layouts?.layout.threshold ?? threshold
	$: breakpoint = styles.layouts?.layout.breakpoint ?? breakpoint

	$: props = {
		...props,
		scene,
		geometry,
		meta,
		page,
		title,
		color,
		variant,
		size,
		layout,
		breakpoint,
		threshold,
		asset,
		name: `ui-${name}`,
		settings,
		actionPath,
		redirect,
		background,
	}

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

{#key title}
	<svelte:component this={component} id={path.replaceAll('/', '.')} {...props} />
{/key}
