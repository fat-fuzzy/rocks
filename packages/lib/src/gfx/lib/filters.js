const KERNELS = {
	/* prettier-ignore */
	normal: [
		0, 0, 0,
		0, 1, 0,
		0, 0, 0,
	],
	/* prettier-ignore */
	gaussianBlur: [
		0.045, 0.122, 0.045,
		0.122, 0.332, 0.122,
		0.045, 0,122, 0,145
	],
	/* prettier-ignore */
	gaussianBlur2: [
		1, 2, 1,
		2, 4, 2,
		1, 2, 1,
	],
	/* prettier-ignore */
	gaussianBlur3: [
		0, 1, 0,
		1, 1, 1,
		0, 1, 0,
	],
	/* prettier-ignore */
	unsharpen: [
		-1, -1, -1,
		-1,  9, -1,
		-1, -1, -1,
	],
	/* prettier-ignore */
	sharpness: [
		0, -1,  0,
		-1,  5, -1,
		0, -1,  0,
	],
	/* prettier-ignore */
	sharpen: [
		-1, -1, -1,
		-1, 16, -1,
		-1, -1, -1,
	],
	/* prettier-ignore */
	edgeDetect: [
		-0.125, -0.125, -0.125,
		-0.125,  1,     -0.125,
		-0.125, -0.125, -0.125,
	],
	/* prettier-ignore */
	edgeDetect2: [
		-1, -1, -1,
		-1,  8, -1,
		-1, -1, -1,
	],
	/* prettier-ignore */
	edgeDetect3: [
		-5, 0, 0,
			0, 0, 0,
			0, 0, 5,
	],
	/* prettier-ignore */
	edgeDetect4: [
		-1, -1, -1,
			0,  0,  0,
			1,  1,  1,
	],
	/* prettier-ignore */
	edgeDetect5: [
		-1, -1, -1,
			2,  2,  2,
		-1, -1, -1,
	],
	/* prettier-ignore */
	edgeDetect6: [
		-5, -5, -5,
		-5, 39, -5,
		-5, -5, -5,
	],
	/* prettier-ignore */
	sobelHorizontal: [
			1,  2,  1,
			0,  0,  0,
		-1, -2, -1,
	],
	/* prettier-ignore */
	sobelVertical: [
			1,  0, -1,
			2,  0, -2,
			1,  0, -1,
	],
	/* prettier-ignore */
	previtHorizontal: [
			1,  1,  1,
			0,  0,  0,
		-1, -1, -1,
	],
	/* prettier-ignore */
	previtVertical: [
			1,  0, -1,
			1,  0, -1,
			1,  0, -1,
	],
	/* prettier-ignore */
	boxBlur: [
			0.111, 0.111, 0.111,
			0.111, 0.111, 0.111,
			0.111, 0.111, 0.111,
	],
	/* prettier-ignore */
	triangleBlur: [
			0.0625, 0.125, 0.0625,
			0.125,  0.25,  0.125,
			0.0625, 0.125, 0.0625,
	],
	/* prettier-ignore */
	emboss: [
		-2, -1,  0,
		-1,  1,  1,
			0,  1,  2,
	],
}

function computeKernelWeight(kernel) {
	let weight = kernel.reduce((prev, curr) => {
		return prev + curr
	}, 0)
	return weight <= 0 ? 1 : weight
}

const kernelKeys = Object.keys(KERNELS)

/**
 *
 * @param {string} filter
 * @returns
 */
function getKernel(filter) {
	if (kernelKeys.includes(filter)) {
		return KERNELS[filter]
	}
}

export default {
	getKernel,
	computeKernelWeight,
}
