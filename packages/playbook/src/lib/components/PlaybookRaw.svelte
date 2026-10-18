<script lang="ts">
	import {Head, raw} from '@fat-fuzzy/ui'
	import Raw from './Raw.svelte'

	type Props = {
		category: string
		title: string
	}
	let {category, title}: Props = $props()

	// FIXME: use schema for this
	// eslint-disable-next-line
	let categoryItems: {[name: string]: any} = {
		raw,
	}

	// FIXME: use schema for this
	// eslint-disable-next-line
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
