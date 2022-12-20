<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	type UIComponentChildren = string | ComponentType | (string | ComponentType)[]
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

	// TODO: figure out if I can deduct props
	export let title = 'Unnamed Component'
	export let slug = 'unnamed-component'
	export let component: ComponentType
	export let componentProps: UIComponentProps
	export let storyProps: StoryProps
	export let children: UIComponentChildren

	const {icon, size, variant, theme, ...handlers} = componentProps
	const {icons, sizes, variants, themes, ...actions} = storyProps

	let selected = {...componentProps}

	function selectProp(event, propName: string) {
		const selectedIndex = event.target.selectedIndex
		const selectedValue = event.target.options[selectedIndex].value
		selected = {...selected, [propName]: selectedValue}
	}
</script>

<article class="card layer">
	<h3 id={slug}>{title}</h3>

	<Sidebar size="xs" placement="end">
		<svelte:fragment slot="main">
			<slot name="component">
				{#if component}
					<svelte:component this={component} {...selected} />
				{/if}
			</slot>
		</svelte:fragment>
		<svelte:fragment slot="side">
			<form on:submit|preventDefault class="l-stack start">
				<div class="l-switcher bp:sm">
					{#if icons}
						<Fieldset slug="field-select-icon" legend="Icons">
							<label for="select-icon">Select Icon:</label>
							<select id="select-icon" on:change={(event) => selectProp(event, 'icon')}>
								<option value="">--Please choose an option--</option>
								{#each icons as { name, asset }}
									<option id={name} value={name} selected={name === selected.icon}>{asset}</option>
								{/each}
							</select>
						</Fieldset>
					{/if}
					{#if sizes}
						<Fieldset slug="field-select-size" legend="Size">
							<label for="select-size">Select Size:</label>
							<select id="select-size" on:change={(event) => selectProp(event, 'size')}>
								<option value="">--Please choose an option--</option>
								{#each sizes as size}
									<option id={size} value={size} selected={size === selected.size}>{size}</option>
								{/each}
							</select>
						</Fieldset>
					{/if}
					{#if variants}
						<Fieldset slug="field-select-variant" legend="Variant">
							<label for="select-variant">Select Variant:</label>
							<select id="select-variant" on:change={(event) => selectProp(event, 'variant')}>
								<option value="">--Please choose an option--</option>
								{#each variants as variant}
									<option id={variant} value={variant} selected={variant === selected.variant}>
										{variant}
									</option>
								{/each}
							</select>
						</Fieldset>
					{/if}
					{#if themes}
						<Fieldset slug="field-select-theme" legend="Theme">
							<label for="select-theme">Select Variant:</label>
							<select id="select-theme" on:change={(event) => selectProp(event, 'theme')}>
								<option value="">--Please choose an option--</option>
								{#each themes as theme}
									<option id={theme} value={theme} selected={theme === selected.theme}
										>{theme}</option
									>
								{/each}
							</select>
						</Fieldset>
					{/if}
				</div>
				<!-- <button type="submit" class="highlight">Update</button> -->
			</form>
		</svelte:fragment>
	</Sidebar>
</article>
