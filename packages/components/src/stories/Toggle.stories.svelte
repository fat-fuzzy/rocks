<script>
	import {Meta, Template, Story} from '@storybook/addon-svelte-csf'
	import Toggle from '../lib/toggle/Toggle.svelte'
</script>

<Meta
	title="Toggle"
	component={Toggle}
	argTypes={{
		label: {control: 'text'},
		primary: {control: 'boolean'},
		backgroundColor: {control: 'color'},
		size: {
			control: {type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl']},
		},
		onClick: {action: 'onClick'},
	}}
/>

<Template let:args>
	<form class={`l-wrapper ${args.size}`}>
		<Toggle {...args} on:click={args.onClick} />
	</form>
</Template>

<Story name="Labeled" args={{primary: true, label: 'Check me'}} />
<Story name="Blank" args={{label: ''}} />
