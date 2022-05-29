function Enumerable(base) {
    this._elements = Array.isArray(base) && arguments < 2 ? base : [...arguments]
    this.elements = () => this._elements

    this.where = (filter) => new Enumerable(this._elements).filter(filter)
    this.top = (quantity) => new Enumerable(this._elements.slice(0, quantity))
    this.bottom = (quantity) => new Enumerable(this._elements.reverse()).top(quantity)
    this.first = () => this._elements[0]
    this.last = () => new Enumerable(_elements.reverse()).first()
    this.average = () => this._elements.reduce((partialSum, a) => partialSum + a) / this._elements.length
    this.any = () => this._elements.length > 0
    this.cast = (constructor) => new Enumerable(this._elements.map(x => new constructor(x)))

    this.all = (condition = x => x === x) => {
        const boolArray = this._elements.map(x => condition(x))
        return boolArray.every(true)
    }

    this.add = (element) => this._elements.add(element)
    this.addRange = (elements) => Array.isArray(elements) ? this._elements = [this._elements, ...elements] : {}
    this.lookFor = (element) => recursive.find(element, this._elements)
    this.compare = (element, compFn = (a, b) => a === b) => recursive.compare(this._elements, element, compFn)
    this.equals = (element) => this.compare(this._elements, element)

    return this;
}