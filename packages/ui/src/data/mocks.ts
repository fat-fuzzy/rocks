const links = [
	{slug: '', title: 'Home'},
	{slug: 'about', title: 'About'},
]

const nav = [
	{
		slug: 'ui',
		title: 'RevealNav Example',
		items: [
			{
				slug: 'design-tokens',
				title: 'Design Tokens',
			},
			{
				slug: 'blocks',
				title: 'Block',
				items: [
					{slug: 'nav', title: 'Nav'},
					{slug: 'reveal-nav', title: 'RevealNav'},
				],
			},
			{
				slug: 'layouts',
				title: 'Layouts',
				items: [
					{slug: 'burrito', title: 'Burrito'},
					{slug: 'stack', title: 'Stack'},
				],
			},
		],
	},
]

const button = {id: 'idea', text: 'Idea', type: 'button', variant: '', emoji: '💡'}

const toggle = {id: 'favorite', text: 'Favorite', type: 'button', variant: '', emoji: '❤️'}

const menu = [
	{id: 'vader', text: 'Vader', asset: '👾'},
	{id: 'ollie', text: 'Ollie', asset: '🐙'},
	{id: 'moby', text: 'Moby', asset: '🐳'},
]

const toggleMenu = [
	{id: 'idea', text: 'Idea', asset: '💡'},
	{id: 'profile', text: 'Profile', asset: '🦁'},
	{id: 'favorite', text: 'Favorite', asset: '❤️'},
]

const radio = [
	{id: 'radio-1', label: 'Radio 1'},
	{id: 'radio-2', label: 'Radio 2'},
	{id: 'radio-3', label: 'Radio 3'},
]

const checkbox = [
	{id: 'check-1', label: 'Checkbox 1'},
	{id: 'check-2', label: 'Checkbox 2'},
	{id: 'check-3', label: 'Checkbox 3'},
]

const card = ['Card 1', 'Card 2', 'Card 3']
const form = ['Form input 1', 'Form input 2', 'Form input 3']

const mockIntro = `<p>This is some text that shows you how text content will adapt inside a chosen Layout.</p>`
const textIntro = `<p>Layouts are components that are used to organize how content is displayed on the screen, and designed to work in harmony with the browser's built-in layout algorithms.</p>`
const layouts = `${textIntro}
<p>These Layouts are largely based on the teachings and examples put forth in <a href="https://every-layout.dev/" target="_blank" rel="noreferrer">every-layout.dev</a>, and aim to use minimal HTML markup and carefully written CSS that allow a varied range of design options.</p>

<p>Layouts are designed to be combined in <a href="https://cube.fyi/composition.html" target="_blank" rel="noreferrer">compositions</a>. This means that a Layout can contain Blocks and other Layouts. This is a simple yet very versatile and powerful way to create web page designs.</p>
` // TODO: use README.md
const containers = `<p>Containers are a type of Layout that limit the amount of horizontal space occupied by its contents. This means that containers can only affect: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties" target="_blank" rel="noreferrer">inline logical properties</a>, <code>width</code> and related properties, and spacing properties that affect horizontal dimensions (<code>padding-[left/right]</code>, etc).</p>
<pIf the only direct child of a Container is another Container, it might be a good idea to review how that markup is constructed.</p>
` // TODO: use README.md
const blocks = `
<p>Blocks are components that render the contentful elements of the application. Contentful in this context means elements that provide information, actions, or navigation options to the user of the app.</p>
<p>They are implemented using the <a href="https://developer.mozilla.org/en-US/docs/Web" target="_blank" rel="noreferrer">web platform</a>'s capabilities and with help from the examples provided in <a href="https://inclusive-components.design/" target="_blank" rel="noreferrer">Inclusive Components</a>.</p>
<p>Blocks can be <a href="https://cube.fyi/composition.html" target="_blank" rel="noreferrer">composed</a> with Layouts and other Blocks to create simple or elaborate interfaces while respecting HTML semantics and document structure.</p>` // TODO: use README.md

const app = `
<p>Fat Fuzzy UI is a component library that aims to maximize use HTML and CSS's native capabilities to produce harmonious and robust designs.</p>
<p>The components are built using <a href="https://svelte.dev" target="_blank" rel="noreferrer">Svelte</a> and are built based on the ideas put forth in <a href="https://every-layout.dev/blog/algorithmic-design/" target="_blank" rel="noreferrer">Algorithmic Design</a>, 
and <a href="https://cube.fyi/" target="_blank" rel="noreferrer">CUBE CSS</a></p>
` // TODO: use README.md

const wip = `
<p>🚧 This documentation is a Work in Progress</p>
<p>Thank you for your patience!</p>
` // TODO: use README.md
const text = `${mockIntro} ${app}`

const doc: {[category: string]: string} = {
	text,
	textIntro,
	layouts,
	containers,
	blocks,
	app: `${app} ${wip}`,
}
const sketch = {
	id: '004',
	slug: 'geometry-2d',
	title: 'Geometry 2D ',
	emoji: '📐',
}

export default {
	links,
	nav,
	button,
	menu,
	toggle,
	toggleMenu,
	radio,
	checkbox,
	card,
	form,
	doc,
	sketch,
}
