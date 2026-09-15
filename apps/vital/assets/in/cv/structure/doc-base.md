---
schema_version: "0.1"
name: doc-base
formats: [long, short]
languages: [en, fr]
settings: [
	{
		title: 'Language',
		name: 'language',
		items: [
			en,
			fr,
		]
	},
	{
		title: 'Format',
		name: 'format',
		items: [
			long,
			short,
		]
	}
]
tags: [
	{
		title: 'Version',
		name: 'version',
		type: 'radio',
		items: [
			academia,
			freelance,
			fulltime,
			all,
		]
	},
	{
		title: 'Twilight Z',
		name: 'twilight-z',
		items: [
			draft,
			hidden,
			untagged
		]
	},
	{
		title: 'Basic',
		name: 'basic',
		items: [
			intro,
			skills,
		]
	},
	{
		title: 'Skills',
		name: 'skills',
		items: [
			air,
			ground,
			nesting,
			interests,
		]
	},
	{
		title: 'Teamwork',
		name: 'teamwork',
		items: [
			flocking,
			migration,
			foraging,
			scouting,
			chasing,
		]
	},
	{
		title: 'Mind',
		name: 'mind',
		items: [
			foggy-b,
			brain-fry,
			pirouettes,
			d-n-d
		]
	}
]
---
