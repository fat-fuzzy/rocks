<script lang="ts">
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import type {UiStyleProps} from '$types/index.js'
	import type {TogglePayload} from '$lib/components/blocks/buttons/button.types.js'
	import toggleActor from '$lib/actors/toggle'

	type Props = UiStyleProps & {
		/**
		 * State props
		 */
		id: string
		title?: string
		mode?: string
		disabled?: boolean | undefined
		formaction?: string
		items: TogglePayload[],
		onupdate?: (payload: TogglePayload) => void
	}

	let {
		id = 'toggle-menu',
		title,

		asset,
		color,
		size,
		shape,
		variant,
		container,
		layout = 'switcher',
		threshold,

		mode = 'radio',
		formaction,
		items = [],
		disabled,
		onupdate,
	}: Props = $props()

  let menuActors = $state(items.map((item) => {
    return {...item, actor: toggleActor.actor(id, item.initial, item.name), pressed: item.initial==='active'}
  }))
	let menuItems = new Map(menuActors.map((item) => [item.id, item]))

	let type = formaction ? 'submit' : 'button'
	let containerClass = container ? `${container}:${size}` : ''
	let elementClasses =` l:${layout}:${size} th:${threshold} size:${size} mode:${mode}`
	let menuClasses = title ? elementClasses :`${elementClasses} ${containerClass}`

	function onclick(payload: TogglePayload) {
		menuItems.set(payload.id, payload)
		if(mode === 'radio') {
				// Unpress all other buttons
				menuItems.forEach((value, key, map) => {
				if (key !== payload.id && value.pressed) {
					value.actor.send({type: 'TOGGLE'})
					menuItems.set(key, {...value, pressed: false})
				}
			});
		}
		if (onupdate) {
			onupdate(payload)
		}
	}
</script>

{#snippet menuContent()}
	<menu {id} class={menuClasses}>
		{#each menuItems as [id, props]}
			<li>
				<Toggle
					{onclick}
					{type}
					{formaction}
					{...props}
					{color}
					{variant}
					{size}
					{shape}
					{asset}
					{disabled}
				/>
			</li>
		{/each}
	</menu>
{/snippet}

{#if title}
	<div class={`menu l:stack ${size} ${containerClass}`}>
		<p>{title}</p>
		{@render menuContent()}
	</div>
{:else}
	{@render menuContent()}
{/if}
