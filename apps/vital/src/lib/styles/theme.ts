import type {NamespaceKey} from '$types'
import {NAMESPACES} from '$types'
import type {UiColor} from '@fat-fuzzy/ui'

export function getThemeForNamespace(key: NamespaceKey): UiColor {
	return NAMESPACES[key].theme
}
