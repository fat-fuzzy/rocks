<script lang="ts">
	import type {UiColor, UiSize} from '@fat-fuzzy/ui'
	import type {ICoordinateImports} from '$types'

	import {getContext} from 'svelte'
	import {SvelteURL} from 'svelte/reactivity'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormData from '$lib/ui/controls/data/FormData.svelte'

	let coordImports: ICoordinateImports = getContext('coordImports')

	const {Button} = ui.blocks

	interface Props {
		id: string
		label?: string
		color?: UiColor
		size?: UiSize
		font?: UiSize
		oninput?: () => void // hook for parent to refresh state
	}
	let {
		id,
		label = 'Manage Data',
		color = 'primary',
		size = 'xs',
		font = 'xs',
		oninput,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'lg',
			color,
			label: 'Manage Data',
			position: 'nord-est',
			children: dialogContent,
		})

		dialogActor.show()
	}

	function refreshAndClose() {
		if (oninput) {
			oninput()
		}

		setTimeout(() => {
			coordImports.setStatus('idle')
			dialogActor.close()

			const newUrl = new SvelteURL(page.url)
			newUrl.search = ''

			window.location.href = newUrl.href // FIXME: hacky solution to reload for now
		}, 2000)
	}
</script>

{#snippet dialogContent()}
	<FormData {color} onsubmit={refreshAndClose} />
{/snippet}

<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{color}
	layout="flex"
	justify="end nowrap"
	align="center"
	shape="mellow"
	variant="outline"
	onclick={showDialog}
>
	<span class="font:heading">{label}</span>
	<ff-icon class="svg:herb openmoji size:md l:flex"></ff-icon>
</Button>
