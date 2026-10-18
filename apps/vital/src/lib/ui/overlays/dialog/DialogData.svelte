<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'
	import type {ICoordinateExports, ICoordinateImports} from '#types'

	import {SvelteURL} from 'svelte/reactivity'
	import {Button} from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import dialogActor from '#lib/ui/overlays/dialog/actor.svelte.js'
	import FormData from '#lib/ui/controls/data/FormData.svelte'

	interface Props {
		id: string
		label?: string
		color?: UiColor
		variant?: UiVariant
		size?: UiSize
		font?: UiSize
		coordImports: ICoordinateImports
		coordExports: ICoordinateExports
	}
	let {
		id,
		label = 'Your data',
		color = 'neutral',
		variant = 'outline',
		size = '2xs',
		font = 'xs',
		coordImports,
		coordExports,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'lg',
			color,
			label: 'Your data',
			position: 'nord-est',
			children: dialogContent,
		})

		dialogActor.show()
	}

	function handleSubmit() {
		setTimeout(() => {
			dialogActor.close()
			coordImports.setStatus('idle')

			const newUrl = new SvelteURL(page.url.href)
			newUrl.search = ''
			window.location.href = newUrl.href // FIXME: hacky solution to reload for now
		}, 800)
	}
</script>

{#snippet dialogContent()}
	<FormData {color} onsubmit={handleSubmit} {coordImports} {coordExports} />
{/snippet}

<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{color}
	{variant}
	layout="flex"
	justify="between nowrap"
	align="center"
	onclick={showDialog}
>
	<span class="font:heading">{label}</span>
	<ff-icon class={`svg:arrow-bar-down size:${size} l:flex`}></ff-icon>
</Button>
