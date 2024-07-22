import {test, expect} from '@playwright/experimental-ct-svelte'
import format from '../../../dist/utils/format'
import {getFixtures} from '../../../dist/api/fixtures/js/'
import Nav from '../../../dist/components/recipes/navs/Nav.svelte'
import LinkList from '../../../dist/components/recipes/navs/LinkList.svelte'
import DetailsNav from '../../../dist/components/recipes/navs/DetailsNav.svelte'
import RevealNav from '../../../dist/components/recipes/navs/RevealNav.svelte'

import {getLabelsRecursive} from '../../utils'

test.use({viewport: {width: 500, height: 500}})

const category = 'recipes'

test('Nav', async ({mount}) => {
	// 1. Init
	const props = getFixtures({category, component: 'Nav'})
	const component = await mount(Nav, {props})

	// 2. Test display
	const labels = props.items.map((link) => format.formatLabel(link.title, link.asset))
	await expect(component).toHaveText(labels.join(' '))

	// 3. Test behaviour
	await component.getByText(labels[0]).click()
	// expect(clicked).toBeTruthy() // TODO: fix
})

test('LinkList', async ({mount}) => {
	// 1. Init
	const props = getFixtures({category, component: 'LinkList'})
	const component = await mount(LinkList, {props})

	// 2. Test display
	const labels = props.items.map((link) => format.formatLabel(link.title, link.asset))
	await expect(component).toHaveText(labels.join(' '))

	// 3. Test behaviour
	// TODO
})

test('DetailsNav', async ({mount}) => {
	// 1. Init
	const props = getFixtures({category, component: 'DetailsNav'})
	const component = await mount(DetailsNav, {props})

	// 2. Test display
	const labels = props.items.map((link) => format.formatLabel(link.title, link.asset))
	await expect(component).toHaveText(`${props.title} ${labels.join(' ')}`)

	// 3. Test behaviour
	// TODO
})

test('RevealNav', async ({mount}) => {
	// 1. Init
	const props = getFixtures({category, component: 'RevealNav'})
	const component = await mount(RevealNav, {props})

	// 2. Test display
	const labels = props.items.map((link) => getLabelsRecursive(link))
	await expect(component).toHaveText(`${props.title} ${labels.join(' ')}`)

	// 3. Test behaviour
	// TODO
})
