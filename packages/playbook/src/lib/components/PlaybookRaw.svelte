<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	import Raw from './Raw.svelte'

	const {Head} = ui.headless

	type Props = {
		category: any // TODO: fix types
		content: any
		title: string
		path: string
		formaction?: string
		actionPath?: string
		redirect?: string
	}
	let {category, title}: Props = $props()

	let categoryItems: {[name: string]: any} = {
		raw: ui.raw,
	}

	// TODO: fix types
	let ApiElement: {[category: string]: any} = {
		raw: Raw,
	}

	let description = $derived(`Raw template: ${title}`)

	let GenericElement = $derived(ApiElement[category])
	let SpecifiedElement = $derived(categoryItems[category][title])
</script>

<Head {title} {description} />

<div class="l:flex l:taco:md maki:block">
	<button
		onclick={() => history.back()}
		class="bg:primary variant:fill size:xs"
	>
		Back
	</button>
</div>
<GenericElement children={SpecifiedElement} />
