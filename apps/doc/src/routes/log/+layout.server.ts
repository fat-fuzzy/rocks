import logs from '$data/log'

export const load = async () => {
	const markdowns = await logs.markdowns

	return {markdowns}
}
