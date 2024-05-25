import type {RevealLayoutProps} from '$lib/components/layouts/layout.types.js'

export type RevealMenuProps = RevealLayoutProps & {
	items: any[]
	onclick?: (event: MouseEvent, payload: any) => void // TODO: type this
}
