---
title: CSS Taco
id: '001'
date_created: '2025-01-26'
date_updated: '2025-01-26'
slug: css-taco
description: 'Improving CSS class semantics'
author: 'patiboh'
tags: ['css']
---

## The situation

I was working on some markup. I had GitHub Copilot turned on, and got a suggestion that made me happy about my CSS class names. It reminded me of Nicole's blogpost: [Names should be cute, not descriptive](https://ntietz.com/blog/name-your-projects-cutesy-things/).

<div class="ff:callout magic:dante maki:block  ravioli:xs text:center font:xl shape:mellow"><a href="/media/css-taco" class="font:lg">the code made me giggle</a></div>

But there was also a glaring hallucination going on here: 🌮 != 🌯

Moreover, this pointed to an inconsistency in my CSS naming strategy.
I had created a [Center layout](https://every-layout.dev/layouts/center/) and named the CSS class: `l:center`.
I had also created a [Burrito layout](https://rocks.pages.dev/ui/layouts/Burrito) (CSS class: `l:burrito`), which is essentially a width- constrained center layout.
These are the only two "container" classes in the library ([`@fat-fuzzy/style`](https://rocks.pages.dev/about/usage/style)), yet their names don't really convey the layout semantics shared between the two.

## The solution

The `l:taco` class!

- I renamed the class `l:center` into `l:taco` : a wider, less constrained container 🌮
- I kept the class `l:burrito`: a narrower, more constrained container 🌯

This has the added advantage of making dodgy recipes easier to spot:

```html
<div class="l:burrito">
	<p class="l:taco">Are you sure ?</p>
</div>
```

Yay! 🌶️
