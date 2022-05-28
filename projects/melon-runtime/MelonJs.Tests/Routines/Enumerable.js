debug.enableStackTracing(true)

const numbers = new Enumerable(1, 2)

numbers.add(3)
numbers.addRange([4, 5, 6])

const average = numbers.average()

console.log({
    numbers: numbers.elements(),
    average
})

console.log(1)