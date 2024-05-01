<script lang="ts">
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import type {InputPayload, UiStyleProps} from '$types'

	type Props = UiStyleProps & {
		/**
		 * State props
		 */
		id: string
		title?: string
		disabled?: boolean
		formaction?: string
		items: any[] // TODO fix types
		onupdate?: (payload: InputPayload) => void
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

	let selected: {
		id: string
		name: string
		value: string
		pressed: boolean
		actor?: {send: (event: {type: string}) => unknown}
	}[] = $state(items)

	function onclick(payload: InputPayload) {
    if (!payload.pressed) {
			selected = selected.filter((filter) => filter.name !== payload.name)
		} else if (!selected.find((item) => item.name === payload.name)) {
			selected.push(payload)
		}

		onupdate(payload)
	}

	let type = formaction ? 'submit' : 'button'
	let containerClass = container ? `${container}:${size}` : ''
	let elementClasses =` l:${layout}:${size} th:${threshold} size:${size} mode:${mode}`
  let menuClasses = title ? elementClasses :`${elementClasses} ${containerClass}`

</script>

{#snippet menuContent()}
  <menu {id} class={menuClasses}>
    {#each items as props}
      <li>
        <Toggle
          id={`${id}-${props.id}`}
          {onclick}
          {type}
          {formaction}
          {...props}
          color={props.color ?? color}
          variant={props.variant ?? variant}
          size={props.size ?? size}
          shape={props.shape ?? shape}
          asset={props.asset ?? asset}
          disabled={disabled ||
          (mode === 'radio' && selected[0] && selected[0].value === props.value)
            ? true
            : false}
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
