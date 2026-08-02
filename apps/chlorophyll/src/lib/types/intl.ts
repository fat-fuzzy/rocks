import type {DocLanguage} from '$types'

export type Localizations = {
	[lang in DocLanguage]: {
		[key: string]: string
	}
}
