const a = new IndexedArray([1, 2, 3, 4, 4, 4, 4, 4])

a.writeIndex("differentOf4", x => x !== 4)
a.writeIndex("equals4", x => x === 4)

console.log(a.dictionary.differentOf4)
console.log(a.dictionary.equals4)