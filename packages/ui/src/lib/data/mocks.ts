const card = ['Card 1', 'Card 2', 'Card 3']
const form = ['Form input 1', 'Form input 2', 'Form input 3']

const mockIntro = `<p>This is some text that shows you how text content will adapt inside a chosen Layout.</p>`
const textIntro = `<p>Layouts are components that are used to organize how content is displayed on the screen, and designed to work in harmony with the browser's built-in layout algorithms.</p>`
const layouts = `${textIntro}
<p>These Layouts are largely based on the teachings and examples put forth in <a href="https://every-layout.dev/" target="_blank" rel="noreferrer">every-layout.dev</a>, and aim to use minimal HTML markup and carefully written CSS that allow a varied range of design options.</p>

<p>Layouts are designed to be combined in <a href="https://cube.fyi/composition.html" target="_blank" rel="noreferrer">compositions</a>. This means that a Layout can contain Blocks and other Layouts, which is a versatile yet intuitive way to create web page designs.</p>
` // TODO: use README.md
const containers = `<p>Containers are a type of Layout that limit the amount of horizontal space occupied by its contents. This means that containers can only affect: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties" target="_blank" rel="noreferrer">inline logical properties</a>, <code>width</code> and related properties, and spacing properties that affect horizontal dimensions (<code>padding-[left/right]</code>, etc).</p>
<pIf the only direct child of a Container is another Container, it might be a good idea to review how that markup is constructed.</p>
` // TODO: use README.md
const tokens = `
<p>These are the design tokens of the UI library, which correspond to design choices such as color and typography, and which are defined via CSS variables or styled using the native HTML tags. They are the base upon which all the rest is built.</p>
<p>There are many more tokens defined in the <a href="https://github.com/fat-fuzzy/rocks/tree/main/packages/ui/src/lib/styles" target="_blank" rel="noreferrer">CSS library</a>.</p>` // TODO: use README.md
const blocks = `
<p>Blocks self contained, atomic components that provide a piece of information, action, or navigation option to the user of the app. They are generally mapped to a specific HTML tag, or related tags.</p>
<p>They are implemented using the <a href="https://developer.mozilla.org/en-US/docs/Web" target="_blank" rel="noreferrer">web platform</a>'s capabilities and with help from the examples provided in <a href="https://inclusive-components.design/" target="_blank" rel="noreferrer">Inclusive Components</a>.</p>
<p>Blocks can be <a href="https://cube.fyi/composition.html" target="_blank" rel="noreferrer">composed</a> with Layouts and other Blocks to create simple or elaborate interfaces while respecting HTML semantics and document structure.</p>` // TODO: use README.md
// TODO: use README.md
const compositions = `
<p>Compositions are components that provide solutions to common UI usage patterns, and are created using Blocks and Layouts.</p>` // TODO: use README.md

const app = `
<p>
			Fat Fuzzy UI is a component library that aims to maximize use HTML and CSS's native
			capabilities to produce harmonious and robust designs.
		</p>
		<p>
			The components are built using <a href="https://svelte.dev" target="_blank" rel="noreferrer">
				Svelte
			</a>
			and <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer"> SvelteKit </a>, and
			the structure of the library as well as the way the components are designed are based on the
			ideas put forth in
			<a href="https://every-layout.dev/blog/algorithmic-design/" target="_blank" rel="noreferrer">
				Algorithmic Design
			</a>
			and <a href="https://cube.fyi/" target="_blank" rel="noreferrer">CUBE CSS</a>.
		</p>
` // TODO: use README.md

const wip = `
<p>
🚧 The library as well as its documentation are still a work in progress and under active
development.
</p>
<p>Thank you for your patience! ❤️</p>
` // TODO: use README.md
const text = `${mockIntro} ${app}`

const doc: {[category: string]: string} = {
	text,
	textIntro,
	layouts,
	containers,
	compositions,
	blocks,
	tokens,
	app: `${app} ${wip}`,
}
const sketch = {
	id: '004',
	slug: 'geometry-2d',
	title: 'Geometry 2D ',
	asset: '📐',
}

export default {
	card,
	form,
	doc,
	sketch,
}
