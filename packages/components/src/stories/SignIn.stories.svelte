<script>
	import {Meta, Template, Story} from '@storybook/addon-svelte-csf'
	import SignIn from '../lib/signIn/SignIn.svelte'
</script>

<Meta
	title="Sign In"
	component={SignIn}
	argTypes={{
		label: {control: 'text'},
		primary: {control: 'boolean'},
		backgroundColor: {control: 'color'},
		size: {
			control: {type: 'select', options: ['small', 'medium', 'large']},
		},
		onClick: {action: 'onClick'},
	}}
/>

<Template let:args>
	<SignIn {...args} on:click={args.onClick} />
</Template>

<Story name="Labeled" args={{primary: true, label: 'Check me'}} />
<Story name="Blank" args={{label: ''}} />
