import {test, expect} from '@playwright/experimental-ct-svelte'
import {getFixtures} from '../../../dist/api/fixtures/js/'

import Feedback from '../../../dist/components/blocks/global/Feedback.svelte'

test.use({viewport: {width: 500, height: 500}})

const category = 'blocks'

test('Feedback', async ({mount}) => {
	// 1. Init
	const props = getFixtures({category, component: 'Feedback'})
	const component = await mount(Feedback, {props})

	// 2. Test display
	await expect(component).toHaveText(props.text)

	// 3. Test behaviour

	// TODO: test dialog
})
