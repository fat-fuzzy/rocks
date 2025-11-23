import {describe, test, expect} from 'vitest'
import styles from '$lib/utils/styles'

describe('style.ts - a library that builds class names from style prop names', () => {
	test('generates container styles', () => {
		let className = styles.getContainerStyles({
			container: 'ravioli',
			size: 'lg',
		})
		expect(className).toBe('ravioli:lg')
	})
})
