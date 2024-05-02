<script lang="ts">
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import type {UiStyleProps} from '$types/index.js'
	import type {TogglePayload} from '$lib/components/blocks/buttons/button.types.js'

	type Props = UiStyleProps & {
		/**
		 * State props
		 */
		id: string
		title?: string
		mode?: string
		disabled?: boolean
		formaction?: string
		items: {
			id: string,
			name: string,
			text: string,
			value: string,
			initial: string,
		}[],
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

	let menuItems = new Map(items.map((item) => [item.id, item]))

	function onclick(payload: TogglePayload) {
		if(payload.pressed) {
			menuItems.set(payload.id, payload)
		}
		if (onupdate) {onupdate(payload)}
	}

	let type = formaction ? 'submit' : 'button'
	let containerClass = container ? `${container}:${size}` : ''
	let elementClasses =` l:${layout}:${size} th:${threshold} size:${size} mode:${mode}`
	let menuClasses = title ? elementClasses :`${elementClasses} ${containerClass}`

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
					color={color}
					variant={ variant}
					size={ size}
					shape={shape}
					asset={asset}
					disabled={disabled ||
					(mode === 'radio' && menuItems.get(props.id)?.value === props.value)
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
