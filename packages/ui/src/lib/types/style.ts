export type UiContainer = 'burrito' | 'taco' | 'frame' | 'ravioli' | 'raviolink'

export type UiLayout =
	| 'stack'
	| 'switcher'
	| 'grid'
	| 'flex'
	| 'reveal'
	| 'metro'
	| 'voyager'
	| 'tram'
	| 'tgv'
	| 'steam'
	| 'railway'

export type UiStatus = 'default' | 'info' | 'success' | 'warning' | 'error'

export type UiTextContext = 'form' | 'prose' | 'code'

export type UiSize =
	| '3xs'
	| '2xs'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| '2xl'
	| '3xl'

export type UiPalette =
	| 'banana'
	| 'blueberry'
	| 'framboise'
	| 'grape'
	| 'lime'
	| 'litchee'
	| 'mora'
	| 'tangerine'

export type UiTheme = 'primary' | 'accent' | 'highlight' | 'neutral'

export type UiColor = UiStatus | UiPalette | UiTheme

export type UiBrightness = 'day' | 'night' | 'system'

export type UiContrast = 'contrast' | 'blend'

export type UiSurface = 'blur' | 'inherit' | 'light' | 'dark' | UiTheme

export type UiAssetType = 'emoji' | 'svg' | 'none'

export type UiVariant = 'fill' | 'outline' | 'bare'

export type UiShape = 'round' | 'square' | 'pill' | 'soft' | 'mellow' | 'none'

export type UiDimension =
	| 'video'
	| 'twin'
	| 'square'
	| 'full'
	| '30'
	| '40'
	| '50'
	| '60'
	| '70'
	| '80'
	| '90'
