---
title: Feedback
slug: Feedback
category: 'blocks'
group: 'global'
props_state: ['title', 'text']
props_style:
  {
    'blocks': {'element': ['variant', 'context', 'size', 'asset', 'status']},
    'layouts': {'container': ['container', 'size']},
  }
context: ['app.settings', 'shared.container']
---

## Usage

Use this component to provide feedback to the user.

The feedback component is styled according to its `status` and the `context` it appears in.

### Examples

<p class="feedback:prose bg:default:000 variant:bare emoji:default">Coming Soon!</p>

## Resources

[Inclusive Components - Notifications](https://inclusive-components.design/notifications/)
