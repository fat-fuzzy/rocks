<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	type UICOmponentChildren = string | ComponentType | (string | ComponentType)[]
	type UIComponentProps = {
		icon?: string
		size?: string
		theme?: string
		variant?: string
	} & {
		[handler: string]: (event: Event) => unknown
	}
	type StoryProps = {
		icons?: Array<{name: string; asset: SVGElement}>
		sizes?: Array<string>
		themes?: Array<string>
		variants?: Array<string>
		actions?: Array<string>
	}

	// TODO: figure out if I can deduct types
	export let title = 'Unnamed Component'
	export let component: ComponentType
	export let componentProps: UIComponentProps | undefined
	export let storyProps: StoryProps
	export let children: UICOmponentChildren

	let {icon, size, variant, theme, layout, ...handlers} = componentProps
	const {icons, sizes, variants, themes, layouts, ...actions} = storyProps

	let selected = [icon, size, variant, theme]

	function handleSubmit(event) {
		console.log('event')
		console.log(event)
		const data = new FormData(event.target)
		console.log('data')
		console.log(...data)
	}

	$: [selectedIcon, selectedSize, selectedVariant, selectedTheme, selectedLayout] = selected
</script>

<h3>{title}</h3>

<Sidebar placement="end">
	<svelte:fragment slot="main">
		<slot name="component">
			{#if component}
				<svelte:component this={component} {...componentProps} />
			{/if}
		</slot>
	</svelte:fragment>
	<svelte:fragment slot="side">
		<form on:submit|preventDefault={handleSubmit} class={`l-${layout} ${size}`}>
			{#if icons}
				<Fieldset slug="field-select-icon" legend="Icons">
					<label for="select-icon">Select Icon:</label>
					<select id="select-icon">
						<option value="">--Please choose an option--</option>
						{#each icons as { name, asset }}
							<option id={name} value={name} selected={name === selectedIcon}>{asset}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if sizes}
				<Fieldset slug="field-select-size" legend="Select Size">
					<label for="select-size">Select Size:</label>
					<select id="select-size">
						<option value="">--Please choose an option--</option>
						{#each sizes as size}
							<option id={size} value={size} selected={size === selectedSize}>{size}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if variants}
				<Fieldset slug="field-select-variant" legend="Variant">
					<label for="select-variant">Select Variant:</label>
					<select id="select-variant">
						<option value="">--Please choose an option--</option>
						{#each variants as variant}
							<option id={variant} value={variant} selected={variant === selectedVariant}>
								{variant}
							</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if themes}
				<Fieldset slug="field-select-theme" legend="Theme">
					<label for="select-theme">Select Variant:</label>
					<select id="select-theme">
						<option value="">--Please choose an option--</option>
						{#each themes as theme}
							<option id={theme} value={theme} selected={theme === selectedTheme}>{theme}</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			{#if layouts}
				<Fieldset slug="field-select-theme" legend="Theme">
					<label for="select-theme">Select Variant:</label>
					<select id="select-theme">
						<option value="">--Please choose an option--</option>
						{#each layouts as layout}
							<option id={layout} value={layout} selected={layout === selectedLayout}>
								{layout}
							</option>
						{/each}
					</select>
				</Fieldset>
			{/if}
			<button type="submit" class="highlight">Update</button>
		</form>
	</svelte:fragment>
</Sidebar>
