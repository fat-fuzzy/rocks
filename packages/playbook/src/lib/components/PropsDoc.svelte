<script lang="ts">
	import type {Meta} from '$types'

	// import PlaybookInput from './PlaybookInput.svelte'

	// import {PROPS_STATE, getFamily, getInputGroup} from '$lib/props/props-state'
	// type Props = {
	// 	meta: Meta
	// 	familyName: string
	// 	formaction?: string
	// 	onupdate: (payload: {
	// 		name: string
	// 		items: {id: string; value: string}[]
	// 	}) => void
	// }

	type Props = {
		meta: Meta
	}

	let {meta}: Props = $props()

	// let {meta, familyName, formaction, onupdate}: Props = $props()

	// function updateState(event) {
	// 	const payload = {
	// 		name: familyName.toLowerCase(),
	// 		items: [
	// 			{
	// 				id: event.id,
	// 				name: event.name.toLowerCase(),
	// 				value: event.value,
	// 			},
	// 		],
	// 	}
	// 	onupdate(payload)
	// }
</script>

{#if meta}
	{#if meta.props_state}
		<details class="surface:1:primary shape:soft" open>
			<summary
				class="color:primary font:sm font:heading ravioli:3xs shape:soft"
			>
				State Props
			</summary>
			<div class="ravioli:3xs shape:soft">
				<ul class="tags l:switcher:2xs" data-testid="doc-state-props">
					{#each meta.props_state as prop (prop)}
						<!-- {@const inputProps = PROPS_STATE[prop]} -->
						<li data-testid={`prop-state-${prop}`}>
							<!-- TODO: Add state props inputs -->
							<!-- 			{#if inputProps}
							<PlaybookInput
									family={getFamily('config')}
									styleInput={getInputGroup('type', 'app', 'config')}
									{familyName}
									{formaction}
									onupdate={updateState}
								/>
							{:else}
								</p>
							{/if}
							-->
							<p
								class="font:xs ravioli:3xs surface:1:primary variant:bare shape:soft"
							>
								{prop}
							</p>
						</li>
					{/each}
				</ul>
			</div>
		</details>
	{/if}
	{#if meta.content_types}
		<details class="surface:1:accent shape:soft" open>
			<summary class="color:accent font:sm font:heading ravioli:3xs shape:soft">
				Children
			</summary>
			<div class="ravioli:3xs shape:soft">
				<ul class="tags l:switcher:2xs" data-testid="doc-child-props">
					{#each meta.content_types as prop (prop)}
						<li
							class="font:xs ravioli:3xs surface:1:accent variant:bare shape:soft"
							data-testid={`prop-child-${prop}`}
						>
							{prop}
						</li>
					{/each}
				</ul>
			</div>
		</details>
	{/if}
{/if}
