<script>
	import {Meta, Template, Story} from '@storybook/addon-svelte-csf'
	import SignIn from '../lib/components/signIn/SignIn.svelte'
</script>

<Meta
	title="Sign In"
	component={SignIn}
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
		<SignIn {...args} on:click={args.onClick} size={args.size} />
	</form>
</Template>

<Story name="Labeled" args={{primary: true, label: 'Check me'}} />
<Story name="Blank" args={{label: ''}} />
