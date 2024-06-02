import dev from '$data/dev'

export const load = async () => {
	const markdowns = await dev.markdowns

	return {markdowns}
}
