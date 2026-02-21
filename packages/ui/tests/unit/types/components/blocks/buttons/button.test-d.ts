import {test, expectTypeOf, assertType} from 'vitest'
import type {ButtonProps, FuzzyPayload} from '$types'

test('my types work properly', () => {
	const buttonProps: ButtonProps = {
		id: '123',
		name: '123',
		label: '123',
		title: '123',
		value: '123',
		disabled: false,
		popovertarget: '456',
		formaction: '',
		type: 'submit',
		onclick: (event: MouseEvent, payload: FuzzyPayload) => {
			const target = event.target as HTMLButtonElement
			console.log(
				`Button clicked: ${target.name}. Value:${target.value}, Payload: ${payload}`,
			)
		},
	}

	expectTypeOf(buttonProps).toEqualTypeOf<ButtonProps>()
	assertType(buttonProps)
})
