type ButtonProps = {
	id: string
	text: string
	asset: string
}

type ButtonMenuProps = ButtonProps[]

type RadioProps = {
	id: string
	label: string
}

type RadioGroupProps = RadioProps[]

type CheckboxProps = {
	id: string
	label: string
}

type CheckboxGroupProps = CheckboxProps[]

type LinkProps = {
	slug: string
	title: string
}

type LinkListProps = {
	slug: string
	title: string
	items: LinkProps[]
}

export type BlocksProps = {
	Button: ButtonProps
	ButtonMenu: ButtonMenuProps
	Toggle: ButtonProps
	ToggleMenu: ButtonMenuProps

	RadioGroup: RadioGroupProps
	CheckboxGroup: CheckboxGroupProps

	Nav: LinkProps[]
	RevealNav: LinkListProps[]
}

export type SketchProps = {
	id: string
	slug: string
	title: string
	asset: string
}

export type GraphicsProps = {
	Sketch: SketchProps
}

export type LayoutProps = {
	cards: string[]
	form: string[]
	text: string
}
