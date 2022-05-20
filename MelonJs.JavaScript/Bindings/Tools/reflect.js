const reflect = (target) => {
    this.name = target;
    this.getValue = () => eval(`${this.name}`)

    return this;
}