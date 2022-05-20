const ref = (target) => {
    this.name = target;

    this.set = (value) => {
        melon_internal_xset(this.name, value);
    }

    this.value = () => eval(`${this.name}`)

    return this;
}