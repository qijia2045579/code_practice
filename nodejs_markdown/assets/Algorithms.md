# Algorithms

> I would like to reorganize the algorithms that I learned here. It may not be in strict order but will grow gradually.

## .Array



## .String

#### KMP algorithm:

KMP algorithm is used to solve questions like substr(). It will keep a small array to save the pre-visited part, so when you compare further, it knows how much it should go back for review.

The core of KMP is to calculate the prefix table, when you find the place that is not equaling, you go back to the next position from the prefix table.

So, the first step is constructing the prefix_table or called next() function in most code examples.

The construct of the prefix table needs a read-through for the needle.

Prefix table when construct,  p[j] represent at position j how many indexes we can go back.






