# Test Doc

Template for test specification : list example

## Subject of Test

A list

### Requirements

1. A list should store items in the order that they were added
1. A list should hold multiple references to the same item
1. A list should throw an exception when removing an item it doesn't store

...

### Structure

Examples of BDD hypotheses

#### Given

1. An empty list
1. A list with one item
1. A list with more than one item
1. A list with duplicate items

#### When

1. I add an item to the list
1. I add an item to the list more than once
1. I retrieve an item from the list
1. I retrieve an item from an empty list

#### Then

1. I should be able to retrieve the item I added to the list
1. I should get an error if the item does not exist in the list
