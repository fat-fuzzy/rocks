<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import type {UIPropOptions, UIProps, UIChildren} from './ui-options'

	// TODO: figure out if I can deduct props
	export let title = 'Unnamed Component'
	export let slug = 'unnamed-component'
	export let component: ComponentType
	export let selected: UIProps
	export let options: UIPropOptions
	export let children: UIChildren

	const {icons, sizes, variants, themes, layouts, ...actions} = options
	let {icon, size, variant, theme, layout, ...handlers} = selected

	let current = [icon, size, variant, theme, layout]

	function handleSubmit(event) {
		console.log('event')
		console.log(event)
		const data = new FormData(event.target)
		console.log('data')
		console.log(...data)
	}

	$: [currentIcon, currentSize, currentVariant, currentTheme, currentLayout] = current
</script>

<h3>{title}</h3>

<Sidebar size="xs" placement="end">
	<svelte:fragment slot="side">
		<form on:submit|preventDefault={handleSubmit} class={`l-${layout} ${size}`}>
			{#if icons}
				<Fieldset slug="field-select-icon" legend="Icons">
					<label for="select-icon">Select Icon:</label>
					<select id="select-icon">
						<option value="">--Please choose an option--</option>
						{#each icons.items as { id, value }}
							<option {id} {value} selected={id === currentIcon}>{value}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if sizes}
				<Fieldset slug="field-select-size" legend="Size">
					<label for="select-size">Select Size:</label>
					<select id="select-size">
						<option value="">--Please choose an option--</option>
						{#each sizes.items as { id, value }}
							<option {id} {value} selected={id === currentSize}>{value}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if variants}
				<Fieldset slug="field-select-variant" legend="Variant">
					<label for="select-variant">Select Variant:</label>
					<select id="select-variant">
						<option value="">--Please choose an option--</option>
						{#each variants.items as { id, value }}
							<option {id} {value} selected={id === currentVariant}>{value}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if themes}
				<Fieldset slug="field-select-theme" legend="Theme">
					<label for="select-theme">Select Variant:</label>
					<select id="select-theme">
						<option value="">--Please choose an option--</option>
						{#each themes.items as { id, value }}
							<option {id} {value} selected={id === currentTheme}>{value}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if layouts}
				<Fieldset slug="field-select-theme" legend="Theme">
					<label for="select-theme">Select Variant:</label>
					<select id="select-theme">
						<option value="">--Please choose an option--</option>
						{#each layouts.items as { id, value }}
							<option {id} {value} selected={id === currentLayout}>{value}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			<!-- <button type="submit" class="highlight">Update</button> -->
		</form>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<slot name="component">
			{#if component}
				<svelte:component this={component} {...current} />
			{/if}
		</slot>
	</svelte:fragment>
</Sidebar>
