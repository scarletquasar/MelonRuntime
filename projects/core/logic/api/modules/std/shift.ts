function shift() {
    return {
        option: (condition: boolean, callback: Function, finishOnTrue = false) => {
            condition ? callback() : {};
            if(finishOnTrue) {
                return;
            }
            
            return shift();
        }
    }
}

export { shift }