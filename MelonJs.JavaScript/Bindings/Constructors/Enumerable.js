function Enumerable(base) {
    this._elements = Array.isArray(base) ? base : []
    this.all = () => this.elements

    this.where = (filter) => new Enumerable(this._elements).filter(filter)
    this.top = (quantity) => new Enumerable(this._elements.slice(0, quantity))
    this.bottom = (quantity) => new Enumerable(this._elements.reverse()).top(quantity)
    this.first = () => this._elements[0]
    this.last = () => new Enumerable(_elements.reverse()).first()
    this.average = () => this._elements.reduce((partialSum, a) => partialSum + a) / this._elements.length
    this.any = () => this._elements.length > 0
    this.cast = (constructor) => new Enumerable(this._elements.map(x => new constructor(x)))

    this.all = (condition) => {
        const boolArray = this._elements.map(x => condition(x))
        return boolArray.every(true)
    }

    return this;
}