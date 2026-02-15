import type {FuzzyState, ButtonStateProps} from '$types'

export type UiStateExpand = 'expanded' | 'collapsed'

export type ExpandMachine = {
	expanded: FuzzyState
	collapsed: FuzzyState
}
/**
 * This component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */

export type ExpandProps = ButtonStateProps & {
	controls: string
	states?: ExpandMachine
}
