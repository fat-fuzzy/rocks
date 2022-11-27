export interface Decision {
	id: string;
	year: number;
	title: string; // for reference only, not sure I'll keep it
}
const decisions: Decision[] = [
	{
		id: '000',
		year: 2022,
		title: 'Architectural decisions'
	},
	{
		id: '001',
		year: 2022,
		title: 'Monorepo'
	},
	{
		id: '002',
		year: 2022,
		title: 'Initial Packages and Stack'
	},
	{
		id: '003',
		year: 2022,
		title: 'Document and simplify'
	}
];

export default { decisions };
