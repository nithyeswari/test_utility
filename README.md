## Task
Write a program that takes as argument the path to a file containing one word per line, groups the words that are anagrams to each other, and writes to the standard output each of these groups.The groups should be separated by newlines and the words inside each group by commas.

### Assumptions
You can make the following assumptions about the data in the files:

	•	The words in the input file are ordered by size
	•	Production files will not fit into memory all at once (but all the words of the same size would)
	•	The words are not necessarily actual English words, for example, “abc” and “cba” are both considered words for the sake of this exercise.
	•	The files provided in the `Data` folder are just sample input data to help you reason about the problem. Production files will be much bigger.
	•	If you make other assumptions, make sure you write them down in a readme in your submission
 
## Solution

Build a frequency character histograms of each string and check whether those histograms are same.

## How to run?

### Application
node index.js 'data/example1.txt'

### Test 
npm run test

## Run Time complexity 

Runtime complexity is O(PlogPN)

N - length of string
P - Total number  of string

### Refer below for more details,

- complexity of buiding charater map
  ` let firstCharMap = GetHistogram(first); ` 
is O(N) 

- complexity of charatermap comparision
`for (let char in firstCharMap) {
}`
is O(N/2) -> only half of the strings in array go through this.

- complexity of grouping
`for (let groupKey in groupedList) { 
}`
is O(log P)

- complexity of processing all lines
`isAnagram()`
is O(P)

O(P*log P*(O(N)+O(N/2)) = O(PlogPN)


## Space complexity  

O(NP^2) 
 
N - Length of string
P - Total number of string

# Further enchancements

- Reduce the space complexity 
- Memonize function call  
