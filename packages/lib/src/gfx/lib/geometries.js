/* prettier-ignore */
const DEFAULT_GEOMETRY_COORDS = [
	// left column
	0, 0,
	30, 0,
	0, 150,
	0, 150,
	30, 0,
	30, 150,

	// top rung
	30, 0,
	100, 0,
	30, 30,
	30, 30,
	100, 0,
	100, 30,

	// middle rung
	30, 60,
	67, 60,
	30, 90,
	30, 90,
	67, 60,
	67, 90,
]

/* prettier-ignore */
const DEFAULT_3D_GEOMETRY_COORDS = [
	// left column
		0,   0,  0,
	 30,   0,  0,
		0, 150,  0,
		0, 150,  0,
	 30,   0,  0,
	 30, 150,  0,

	// top rung
	 30,   0,  0,
	100,   0,  0,
	 30,  30,  0,
	 30,  30,  0,
	100,   0,  0,
	100,  30,  0,

	// middle rung
	 30,  60,  0,
	 67,  60,  0,
	 30,  90,  0,
	 30,  90,  0,
	 67,  60,  0,
	 67,  90,  0,
]

/* prettier-ignore */
const STAR_GEOMETRY_COORDS = [
	// left column
	0, 0,
	30, 0,
	0, 150,
	0, 150,
	30, 0,
	30, 150,

	// top rung
	30, 0,
	100, 0,
	30, 30,
	30, 30,
	100, 0,
	100, 30,

	// middle rung
	30, 60,
	67, 60,
	30, 90,
	30, 90,
	67, 60,
	67, 90,
]

/* prettier-ignore */
const DEFAULT_RECT_COORDS = [
	// left column
	0, 0,
	30, 0,
	0, 150,
	0, 150,
	30, 0,
	30, 150,
]

export default {
	DEFAULT_GEOMETRY_COORDS,
	DEFAULT_3D_GEOMETRY_COORDS,
	DEFAULT_RECT_COORDS,
}
