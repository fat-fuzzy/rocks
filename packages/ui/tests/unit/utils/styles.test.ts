import {describe, test, expect} from 'vitest'

import styles from '$lib/utils/styles'
import props from '../../fixtures/props'
const blockProps = props.PROPS_BLOCK
const containerProps = props.PROPS_CONTAINER
const layoutProps = props.PROPS_LAYOUT

describe('style.ts - a library that builds class names from style prop names', () => {
	test('generates container styles', () => {
		let actualValues = styles.getContainerStyles(containerProps)
		let expectedClasses = props.getContainerClasses(containerProps)
		expect(actualValues).toBe(expectedClasses)
	})

	test('generates layout styles', () => {
		let actualValues = styles.getLayoutStyles(layoutProps)
		let expectedClasses = props.getLayoutClasses(layoutProps)
		expect(actualValues).toBe(expectedClasses)
	})

	test('generates block styles', () => {
		let actualValues = styles.getBlockStyles(blockProps)
		let expectedClasses = props.getBlockClasses(blockProps)

		expect(actualValues).toBe(expectedClasses)
	})
})
