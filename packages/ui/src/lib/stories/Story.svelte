<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import type {UIProps, UIChildren} from './ui-options'
	import {options} from './ui-options'

	// TODO: figure out if I can deduct props
	export let title = 'Unnamed Component'
	export let slug = 'unnamed-component'
	export let component: ComponentType
	export let selected: UIProps
	export let showOptions = false
	export let children: UIChildren

	let {icon, size, variant, theme, layout, ...handlers} = selected

	let current = {...selected}

	function setCurrent(event, propName: string) {
		const selectedIndex = event.target.selectedIndex
		const selectedValue = event.target.options[selectedIndex].value
		current = {...current, [propName]: selectedValue}
	}
</script>

<article class="l-stack">
	{#if $page.params.component === slug}
		<h1>{title}</h1>
	{:else}
		<h2>{title}</h2>
	{/if}

	<Sidebar size="xs" placement="end">
		<svelte:fragment slot="main">
			{#if component}
				<svelte:component this={component} {...current} />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="side">
			{#if showOptions}
				<form on:submit|preventDefault class="l-stack start">
					<div class="l-switcher bp:sm">
						{#if options.icon}
							<Fieldset slug="field-select-icon" legend="Icons">
								<label for="select-icon">Select Icon:</label>
								<select id="select-icon" on:change={(event) => setCurrent(event, 'icon')}>
									<option value="">--Please choose an option--</option>
									{#each options.icon.items as { id, value }}
										<option {id} {value} selected={id === current.icon}>{value}</option>
									{/each}
								</select>
							</Fieldset>
						{/if}
						{#if options.size}
							<Fieldset slug="field-select-size" legend="Size">
								<label for="select-size">Select Size:</label>
								<select id="select-size" on:change={(event) => setCurrent(event, 'size')}>
									<option value="">--Please choose an option--</option>
									{#each options.size.items as { id, value }}
										<option {id} {value} selected={id === current.icon}>{value}</option>
									{/each}
								</select>
							</Fieldset>
						{/if}
						{#if options.variant}
							<Fieldset slug="field-select-variant" legend="Variant">
								<label for="select-variant">Select Variant:</label>
								<select id="select-variant" on:change={(event) => setCurrent(event, 'variant')}>
									<option value="">--Please choose an option--</option>
									{#each options.variant.items as { id, value }}
										<option {id} {value} selected={id === current.icon}>{value}</option>
									{/each}
								</select>
							</Fieldset>
						{/if}
						{#if options.theme}
							<Fieldset slug="field-select-theme" legend="Theme">
								<label for="select-theme">Select Variant:</label>
								<select id="select-theme" on:change={(event) => setCurrent(event, 'theme')}>
									<option value="">--Please choose an option--</option>
									{#each options.theme.items as { id, value }}
										<option {id} {value} selected={id === current.icon}>{value}</option>
									{/each}
								</select>
							</Fieldset>
						{/if}
						{#if options.layout}
							<Fieldset slug="field-select-theme" legend="Theme">
								<label for="select-theme">Select Variant:</label>
								<select id="select-theme" on:change={(event) => setCurrent(event, 'theme')}>
									<option value="">--Please choose an option--</option>
									{#each options.layout.items as { id, value }}
										<option {id} {value} selected={id === current.icon}>{value}</option>
									{/each}
								</select>
							</Fieldset>
						{/if}
					</div>
					<!-- <button type="submit" class="highlight">Update</button> -->
				</form>
			{/if}
		</svelte:fragment>
	</Sidebar>
</article>
