import {writable, readable} from 'svelte/store'

import * as _animations from '../gl/animations.js'

export const animations = readable(_animations.animations)
export const currentAnimationId = writable('random-rect')
