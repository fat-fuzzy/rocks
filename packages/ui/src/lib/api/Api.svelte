<script lang="ts">
	import type {ComponentProps, ApiOptions} from './options'
	import format from '../utils/format'
	import ToggleMenu from '../blocks/buttons/ToggleMenu.svelte'
	import Fieldset from '../blocks/forms/Fieldset.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let title = ''
	export let options: ApiOptions
	// TODO: figure out how I can deduct props from Svelte component
	export let selected: ComponentProps

	function handleInput(event, name) {
		const payload = {
			name,
			items: [
				{
					id: event.target.name.toLowerCase(),
					name: event.target.name,
					value: event.target.value,
				},
			],
		}
		dispatch('changed', payload)
	}

	function handleToggle(event, name, id) {
		const selected = event.detail.selected // TODO: no multiple values for now
		if (selected.length) {
			const payload = {
				name,
				items: [
					{
						id: id.toLowerCase(),
						name: id,
						value: selected[0].pressed ? selected[0].id : '',
					},
				],
			}

			dispatch('changed', payload)
		}
	}

	let apiLayout = 'switcher'

	$: elementOptions = Object.keys(selected).map((key) => ({name: key, value: selected[key]}))

	// TODO: clean, comment
</script>

<form on:submit|preventDefault class={`l-${apiLayout}`}>
	{#each elementOptions as prop}
		{#if options[prop.name]}
			{@const styleFamily = options[prop.name]}
			{#if !styleFamily.include || styleFamily.include.indexOf(title) !== -1}
				{#if !styleFamily.exclude || styleFamily.exclude.indexOf(title) === -1}
					<Fieldset
						legend={styleFamily.name}
						slug={`field-${styleFamily.name}`}
						type="input-group"
						layout={`${styleFamily.layout}`}
					>
						{#if styleFamily.items}
							{#each styleFamily.items as styleOptions}
								{@const {name, input, items, layout, include, exclude} = styleOptions}
								{#if !include || include.indexOf(title) !== -1}
									{#if !exclude || exclude.indexOf(title) === -1}
										{@const classes = layout ? `l:${layout} xxs` : `xxs`}
										{#if input === 'radio' || input === 'checkbox'}
											{#each items as { id, label }}
												{@const checked = id === prop.value}
												<label for={`${input}-${id}`} class={classes}>
													{label}
													<input
														type={input}
														id={`${input}-${id}`}
														value={id}
														{name}
														{checked}
														class="primary"
														on:input={(event) => handleInput(event, styleFamily.name)}
													/>
												</label>
											{/each}
										{/if}
										{#if input === 'toggle'}
											<ToggleMenu
												id={name}
												title={name !== styleFamily.name ? name : ''}
												{items}
												layout={`${layout} xxs`}
												on:changed={(event) => handleToggle(event, styleFamily.name, name)}
											/>
										{/if}
										{#if input === 'datalist'}
											<label for={`choice-${name}`}>{`Select ${name}`}</label>
											<input
												list={`items-${name}`}
												id={`choice-${name}`}
												{name}
												on:input={(event) => handleInput(event, styleFamily.name)}
											/>
											<datalist id={`items-${name}`}>
												{#each items as { id, label, asset }}
													<option {id} value={asset}>{format.formatLabel(label, asset)}</option>
												{/each}
											</datalist>
										{/if}
									{/if}
								{/if}
							{/each}
						{/if}
					</Fieldset>
				{/if}
			{/if}
		{/if}
	{/each}
</form>
