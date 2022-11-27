export const load = async ({ fetch }) => {
	try {
		const response = await fetch('/api/decisions');
		const decisions = await response.json();

		return {
			decisions
		};
	} catch (error) {
		console.log(error);
		// TODO: proper error handling
	}
};
