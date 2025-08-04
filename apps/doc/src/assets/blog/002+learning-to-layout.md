---
title: 'Learning to Layout'
id: '002'
slug: learning-to-layout
date_created: '2025-08-04'
date_updated: '2025-08-04'
description: 'Learning to create layouts is an foundational step in building web interfaces, an investment in UI, and a skill that can be learned!'
author: 'patiboh'
tags: ['css', 'html']
---

## What is Layout all about anyway

Making content responsive? Yes, but that's just the means to an end.

Layout is about making content clear to the visitor of an app or site.

It's about information architecture and semantics.

It's about hierarchy of meaning and the relationships that underlie what is displayed on the screen.

It's about making choices about where to display things and how.

This might be stepping into the realm of design.

Yet, how can we write semantic HTML if we don't understand the structure, hierarchies and relationships that we intend to implement with code ?

## Styling Frameworks

CSS is, as [Josh Comeau points out](https://www.youtube.com/watch?v=Uzc_EKCGd14), deceptively simple: one can easily get though the basics, but the underlying principles of the language are not always easy to grasp.
Unlike general purpose languages such as Python or JavaScript: HTML and CSS are Domain Specific Languages.

Good CSS takes semantic HTML and makes its meaning shine.

### (un) Strap your boots

Letting go of the framework

One reason why Bootstrap became so popular when it came out was that it proposed a robust solution for creating 12-column grid layouts.

12-column layouts might seem old-fashioned, but the number 12 can be divided into many combinations of equal or unequal but proportional chunks to fit and align content in many size / dimension combinations that can easily be made responsive through some basic maths and some media queries.

Issues: ~~no one~~ few people seem to use CSS frameworks like the authors intended.

## Naming strategies

The elephant in (my) room

### (un) Wind your tails

Whatever system you choose to create your CSS classes, that system is in itself a naming strategy. Before you can device an effective naming strategy, you need to understand the underlying structures that the class names will cover.

## The problem of scale

As programmers, we like to be very watchful about scale.

Scale in terms of storage, or compute, or networks connections, or users.

But what about the scale of time? Code that has a short shelf life can be expensive in the long run too.
Throwaway UI code is expensive.

Migrating HTML / CSS is a painful ordeal: changing class names and HTML can be outright hell if the code we have to deal with is difficult to navigate and perilous to untangle.

Solid layout mechanisms - the stuff that HTML and CSS developers _can learn_ how to do reliably - are investments that age at a much slower rate than trends of rounded vs hard corners, skeumorphism vs flat layouts, or pastel colors vs vivid ones.
The latter are elements of design that tend to have a shorter shelf life than the elements that structure the information architecture of an app or site.

## Investing in your UI

Like cherry blossoms: we are fascinated when they arrive and are charmed by their beauty. But they are ephemeral: it is the trunk and the branches that will take the tree through the winter so that the next generation of flowers can bloom and bear fruit again in the spring.

So: when we plan and code UI, we need to invest in the trees: your layout is the trunk from which the branches of your page will grow, so that your content can blossom on top and bear its fruit for all to enjoy.

Learning how to code layouts empowers you to build the trunks and the branches of your UI.
If you craft them carefully and if you mind how you architecture your CSS, the work you do in this step of the process is work that can remain long after the blooming season has passed.

<p class="font:xl"> 🌱 🌳 🌸 🍒</p>

## Resources

- The cutest of CSS layout learning playgrounds: [flexboxfroggy](https://flexboxfroggy.com/) and [cssgridgarden](https://cssgridgarden.com/)
- [MDN Layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout) There is much to learn from reading the doc!
- [every-layout.dev](https://every-layout.dev/): This site changed my way of thinking about building layout. You can read [the foundations here](https://every-layout.dev/rudiments/boxes/)
- [Grid by Example](https://gridbyexample.com/learn/): A solid reference with a wide range of examples on creating grid based layouts
- [Josh Comeau's post Understanding Layout Algorithms](https://www.joshwcomeau.com/css/understanding-layout-algorithms/) unpacks terminology and how different layout properties interact with one another

Information architecture is a topic all by itself, I might make it the subject for another post !
