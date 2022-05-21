const a = new IndexedArray([1, 2, 3, 4, 4, 4, 4, 4])
const b = new IndexedArray(5)

a.writeIndex("differentOf4", x => x !== 4)
a.writeIndex("equals4", x => x === 4)

console.log(a.indexes.differentOf4.asArray())
console.log(a.indexes.equals4.asArray())
console.log(b.asArray())