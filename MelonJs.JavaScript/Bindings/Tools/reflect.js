const reflect = (target) => {
    this.name = target;
    this.modificator = x => x;
    
    this.getValue = () => this.modificator(eval(`${this.name}`));
    
    return this;
}