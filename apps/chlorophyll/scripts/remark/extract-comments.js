import {toHast} from 'mdast-util-to-hast'
import {toHtml} from 'hast-util-to-html'

const openBlockRegex =
	/^<!--\s*block:\s*(?<name>[\w-]+)\s*\|\s*tags:\s*(?<tags>[\w-]+(?:,\s*[\w-]+){0,20})\s*-->$/

const closeBlockRegex = /^<!--\s*\/block\s*-->$/

const openSectionRegex = /^<!--\s*section:\s*(?<name>[\w-]+)\s*-->$/

/**
 * This plugin will parse HTML comment blocks in markdown with the patterns below

************************
******* SECTIONS *******
************************

Doc structure templates may declare (ordered) sections:

<!-- section: section-name -->

 * This enables:
 * - to structure output using named sections
 * - to retrieve section content based on previously declared section items
 * Sections must be identified in their markdown document using frontmatter:

```md
---
name: section-name
---
```

The markdown file that contains that section will have a `sections` entry
in its frontmatter output containing the parsed section entry:

```json
{
  ... other front matter data
	section-name: [
		01-section,
		02-section,
		03-section,
	]
  sections: [
		{
			name: 01-section,
      html: '<section>Here is some section content</section>'
		}
  ]
}
```

************************
******** BLOCKS ********
************************

Doc section markdowns may be chunked into blocks of content:

```md
<!-- block: block-name | tags: public, beginners -->

Here is some block content

<!-- /block -->
```

This enables:
- named markdown regions
- tagging of named markdown regions

The markdown file that contains that block will have a `blocks` entry
in its parsed frontmatter output that will contain the block content and metadata:

```json
{
  ... other frontmatter data
  blocks: [
		{
			name: block-name,
			parent: parent-name,
      content: {
				html: '<p>Here is some block content</p>',
				json: {}
			},
			tags: [ 'public', 'beginners' ]
		}
  ]
}
```
*/
export default function remarkExtractComments() {
	// @ts-expect-error tree: MdastNodes, file: Options
	return async (tree, file) => {
		const blocks = [] // {name: string, html: string, tags: string[]}
		const sections = []
		let currentBlock = null // : string | null
		let blockNodes = [] // : Block[]
		let tagList = []

		for (const node of tree.children) {
			if (node.type === 'html') {
				const openBlockMatch = node.value.match(openBlockRegex)
				const closeBlockMatch = node.value.match(closeBlockRegex)
				const openSectionMatch = node.value.match(openSectionRegex)

				if (openBlockMatch?.groups) {
					const {name, tags} = openBlockMatch.groups

					// @ts-expect-error tag: string
					tagList = tags.split(',').map((tag) => tag.trim())
					currentBlock = name
					blockNodes = []
				} else if (closeBlockMatch && currentBlock) {
					// Serialize captured nodes to HTML
					const fragment = {type: 'root', children: blockNodes}
					const blockName = currentBlock

					// Add new block data
					const newBlock = {
						name: blockName,
						rank: blockNodes.length,
						parent: file.data.fm.name,
						content: {
							// @ts-expect-error 'root' should cover intended usage
							html: toHtml(toHast(fragment)),
							json: fragment,
						},
						tags: tagList,
					}

					blocks.push(newBlock) // Keep track of order of appearance

					// Reset current block data
					currentBlock = null
					blockNodes = []
					tagList = []
				} else if (openSectionMatch?.groups) {
					const {name} = openSectionMatch.groups
					sections.push(name)
				}
			} else if (currentBlock) {
				blockNodes.push(node)
			}
		}

		file.data.fm = {
			...file.data.fm,
			sections: sections.length > 0 ? sections : undefined,
			blocks: blocks.length > 0 ? blocks : undefined,
		}
	}
}
