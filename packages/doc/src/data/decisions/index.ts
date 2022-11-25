export interface Decision {
	id: string;
	title: string; // for reference only, not sure I'll keep it
	content?: string;
}
const decisions: Decision[] = [
	{
		id: 'decision-2022-000',
		title: 'Architectural decisions'
	},
	{
		id: 'decision-2022-001',
		title: 'Monorepo'
	},
	{
		id: 'decision-2022-002',
		title: 'Initial Packages and Stack'
	},
	{
		id: 'decision-2022-003',
		title: 'Document and simplify'
	}
];

export default { decisions };
